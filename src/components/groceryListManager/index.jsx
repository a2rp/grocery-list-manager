import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FiCheck, FiEdit2, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { Styled } from "./styled";

const STORAGE_KEY = "grocery-list.v1";
const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
const safeQuantity = (value) => {
    const quantity = Number(value);
    return Number.isFinite(quantity) ? Math.min(9999, Math.max(1, Math.trunc(quantity))) : 1;
};

const normalizeItem = (value) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    if (typeof value.id !== "string" || !value.id.trim() || typeof value.name !== "string" || !value.name.trim()) return null;
    return {
        id: value.id,
        name: value.name.trim().slice(0, 80),
        category: typeof value.category === "string" ? value.category.trim().slice(0, 40) : "",
        qty: safeQuantity(value.qty),
        bought: value.bought === true,
        createdAt: Number.isFinite(Number(value.createdAt)) ? Number(value.createdAt) : Date.now(),
    };
};

const load = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === null) return [];
        const parsed = JSON.parse(saved);
        if (!Array.isArray(parsed)) return [];
        const seen = new Set();
        return parsed.map(normalizeItem).filter((item) => {
            if (!item || seen.has(item.id)) return false;
            seen.add(item.id);
            return true;
        });
    } catch { return []; }
};

export default function GroceryListManager() {
    const [items, setItems] = useState(load);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [qty, setQty] = useState(1);
    const [query, setQuery] = useState("");
    const [catFilter, setCatFilter] = useState("All");
    const [editing, setEditing] = useState(null);
    const [storageError, setStorageError] = useState(false);

    // confirm modal
    const [confirm, setConfirm] = useState(null);
    const dialogRef = useRef(null);
    const cancelRef = useRef(null);
    const nameInputRef = useRef(null);
    const askConfirm = (opts) =>
        setConfirm({ title: "Are you sure?", confirmText: "Confirm", cancelText: "Cancel", tone: "default", ...opts });
    const handleConfirm = useCallback(() => { const fn = confirm?.onConfirm; setConfirm(null); if (fn) fn(); }, [confirm]);
    useEffect(() => {
        if (!confirm) return;
        const previousFocus = document.activeElement;
        cancelRef.current?.focus();
        const onKey = (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                setConfirm(null);
                return;
            }
            if (event.key !== "Tab") return;
            const focusable = dialogRef.current?.querySelectorAll("button:not(:disabled)");
            if (!focusable?.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("keydown", onKey);
            if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
            else nameInputRef.current?.focus();
        };
    }, [confirm]);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
            setStorageError(false);
        } catch {
            setStorageError(true);
        }
    }, [items]);

    const categories = useMemo(() => ["All", ...Array.from(new Set(items.map(i => i.category).filter(Boolean))).sort((a, b) => a.localeCompare(b))], [items]);

    const filtered = useMemo(() => {
        let list = items;
        if (catFilter !== "All") list = list.filter(i => (i.category || "").toLowerCase() === catFilter.toLowerCase());
        if (query.trim()) {
            const q = query.toLowerCase();
            list = list.filter(i => i.name.toLowerCase().includes(q) || (i.category || "").toLowerCase().includes(q));
        }
        // sort: category asc, bought last, name asc
        return [...list].sort((a, b) => {
            const ca = (a.category || "~"), cb = (b.category || "~");
            if (ca !== cb) return ca.localeCompare(cb);
            if (a.bought !== b.bought) return a.bought - b.bought; // not bought first
            return a.name.localeCompare(b.name);
        });
    }, [items, catFilter, query]);

    const grouped = useMemo(() => {
        const map = new Map();
        for (const it of filtered) {
            const key = it.category || "Uncategorized";
            if (!map.has(key)) map.set(key, []);
            map.get(key).push(it);
        }
        return Array.from(map.entries()); // [ [cat, items[]], ... ]
    }, [filtered]);

    const totals = useMemo(() => ({
        total: items.length,
        open: items.filter(i => !i.bought).length,
        bought: items.filter(i => i.bought).length
    }), [items]);

    const addItem = (e) => {
        e.preventDefault();
        const n = name.trim();
        const c = category.trim();
        if (!n) return;
        setItems(prev => [{ id: uid(), name: n.slice(0, 80), category: c.slice(0, 40), qty: safeQuantity(qty), bought: false, createdAt: Date.now() }, ...prev]);
        setName(""); setCategory(""); setQty(1);
    };

    const toggleBought = (id) => setItems(prev => prev.map(i => i.id === id ? { ...i, bought: !i.bought } : i));
    const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));
    const startEdit = (id) => setEditing(id);
    const saveEdit = (id, patch) => { setItems(prev => prev.map(i => i.id === id ? { ...i, ...patch } : i)); setEditing(null); };
    const cancelEdit = () => setEditing(null);

    const incQty = (id, delta) => setItems(prev => prev.map(i => {
        if (i.id !== id) return i;
        const next = Math.max(1, (Number(i.qty) || 1) + delta);
        return { ...i, qty: next };
    }));

    const clearBought = () => setItems(prev => prev.filter(i => !i.bought));
    const markVisibleBought = () => {
        const visible = new Set(filtered.map(i => i.id));
        setItems(prev => prev.map(i => visible.has(i.id) ? { ...i, bought: true } : i));
    };

    return (
        <Styled.Page id="grocery-list">
            <Styled.Container>
                <Styled.Header>
                    <div>
                        <Styled.Title>Grocery List</Styled.Title>
                        <Styled.Sub>Categories • quantities • local storage</Styled.Sub>
                    </div>
                    <Styled.BadgeRow>
                        <Styled.Badge>{totals.open} to buy</Styled.Badge>
                        <Styled.Badge tone="muted">{totals.bought} bought</Styled.Badge>
                    </Styled.BadgeRow>
                </Styled.Header>

                {storageError && <Styled.StorageNotice role="status">Your browser could not save this list. Changes will remain only until you leave this page.</Styled.StorageNotice>}

                <Styled.Card as="form" onSubmit={addItem}>
                    <Styled.FormRow>
                        <Styled.Input
                            ref={nameInputRef}
                            placeholder="Item name *"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            aria-label="Item name"
                            maxLength={80}
                            required
                        />
                        <Styled.Input
                            placeholder="Category (optional)"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            aria-label="Category"
                            list="cat-suggest"
                            maxLength={40}
                        />
                        <datalist id="cat-suggest">
                            {Array.from(new Set(items.map(i => i.category).filter(Boolean))).map(c => <option key={c} value={c} />)}
                        </datalist>
                        <Styled.Input
                            type="number"
                            inputMode="numeric"
                            min="1"
                            max="9999"
                            step="1"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            aria-label="Quantity"
                            placeholder="Qty"
                        />
                        <Styled.PrimaryButton type="submit" disabled={!name.trim()}>Add</Styled.PrimaryButton>
                    </Styled.FormRow>
                    {!name.trim() && <Styled.Helper>Tip: Item name is required.</Styled.Helper>}
                </Styled.Card>

                <Styled.Toolbar>
                    <Styled.RowWrap>
                        <Styled.Select value={catFilter} onChange={(e) => setCatFilter(e.target.value)} aria-label="Filter by category">
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </Styled.Select>

                        <Styled.Input
                            placeholder="Search item or category..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            aria-label="Search"
                        />
                    </Styled.RowWrap>

                    <Styled.RowWrap>
                        <Styled.Button
                            type="button"
                            disabled={!filtered.some((item) => !item.bought)}
                            onClick={() => askConfirm({
                                title: "Mark visible as bought?",
                                message: `Mark ${filtered.filter(i => !i.bought).length} item(s) as bought?`,
                                confirmText: "Mark bought",
                                onConfirm: markVisibleBought
                            })}
                        >
                            <FiCheck aria-hidden="true" />
                            Mark visible bought
                        </Styled.Button>

                        <Styled.DangerButton
                            type="button"
                            disabled={!totals.bought}
                            onClick={() => askConfirm({
                                title: "Clear bought items?",
                                message: `Remove ${items.filter(i => i.bought).length} bought item(s)?`,
                                confirmText: "Clear bought",
                                tone: "danger",
                                onConfirm: clearBought
                            })}
                        >
                            <FiTrash2 aria-hidden="true" />
                            Clear bought
                        </Styled.DangerButton>
                    </Styled.RowWrap>
                </Styled.Toolbar>

                {/* Grouped list */}
                <Styled.List>
                    {filtered.length === 0 && <Styled.Empty>No items. Add your first grocery!</Styled.Empty>}

                    {grouped.map(([cat, arr]) => (
                        <div key={cat}>
                            <Styled.GroupHeader>#{cat}</Styled.GroupHeader>
                            {arr.map(it => {
                                if (editing === it.id) {
                                    return (
                                        <EditRow
                                            key={it.id}
                                            item={it}
                                            onCancel={cancelEdit}
                                            onSave={saveEdit}
                                        />
                                    );
                                }
                                return (
                                    <Styled.Item key={it.id} $done={it.bought}>
                                        <Styled.ItemLeft>
                                            <Styled.Checkbox
                                                type="checkbox"
                                                checked={it.bought}
                                                onChange={() => toggleBought(it.id)}
                                                aria-label={`Mark ${it.name} ${it.bought ? "not bought" : "bought"}`}
                                            />
                                            <div>
                                                <Styled.ItemTitle $done={it.bought}>{it.name}</Styled.ItemTitle>
                                                <Styled.ItemMeta>
                                                    <Styled.Tag tone={it.category ? undefined : "muted"}>
                                                        {it.category ? `#${it.category}` : "Uncategorized"}
                                                    </Styled.Tag>
                                                    <span>•</span>
                                                    <span>Qty: {it.qty}</span>
                                                </Styled.ItemMeta>
                                            </div>
                                        </Styled.ItemLeft>

                                        <Styled.ItemRight>
                                            <Styled.IconButton type="button" onClick={() => incQty(it.id, +1)} aria-label={`Increase quantity for ${it.name}`} disabled={it.qty >= 9999}><FiPlus aria-hidden="true" /></Styled.IconButton>
                                            <Styled.IconButton type="button" onClick={() => incQty(it.id, -1)} aria-label={`Decrease quantity for ${it.name}`} disabled={it.qty <= 1}><FiMinus aria-hidden="true" /></Styled.IconButton>
                                            <Styled.IconButton type="button" onClick={() => startEdit(it.id)} aria-label={`Edit ${it.name}`}><FiEdit2 aria-hidden="true" /></Styled.IconButton>
                                            <Styled.IconButton
                                                onClick={() => askConfirm({
                                                    title: "Delete item?",
                                                    message: `Delete "${it.name}"?`,
                                                    confirmText: "Delete",
                                                    tone: "danger",
                                                    onConfirm: () => removeItem(it.id)
                                                })}
                                                type="button"
                                                aria-label={`Delete ${it.name}`}
                                            >
                                                <FiTrash2 aria-hidden="true" />
                                            </Styled.IconButton>
                                        </Styled.ItemRight>
                                    </Styled.Item>
                                );
                            })}
                        </div>
                    ))}
                </Styled.List>

                <Styled.FooterNote>Data stays in your browser (localStorage). Refresh-safe.</Styled.FooterNote>

                {/* Confirm Modal */}
                {confirm && (
                    <Styled.ModalOverlay onClick={() => setConfirm(null)}>
                        <Styled.ModalCard ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="confirm-title" aria-describedby={confirm.message ? "confirm-copy" : undefined} onClick={(e) => e.stopPropagation()}>
                            <Styled.ModalTitle id="confirm-title">{confirm.title}</Styled.ModalTitle>
                            {confirm.message ? <Styled.ModalMessage id="confirm-copy">{confirm.message}</Styled.ModalMessage> : null}
                            <Styled.ModalActions>
                                <Styled.Button ref={cancelRef} type="button" onClick={() => setConfirm(null)}>
                                    {confirm.cancelText || "Cancel"}
                                </Styled.Button>
                                {confirm.tone === "danger" ? (
                                    <Styled.DangerButton type="button" onClick={handleConfirm}>
                                        {confirm.confirmText || "Confirm"}
                                    </Styled.DangerButton>
                                ) : (
                                    <Styled.PrimaryButton type="button" onClick={handleConfirm}>
                                        {confirm.confirmText || "Confirm"}
                                    </Styled.PrimaryButton>
                                )}
                            </Styled.ModalActions>
                        </Styled.ModalCard>
                    </Styled.ModalOverlay>
                )}
            </Styled.Container>
        </Styled.Page>
    );
}

function EditRow({ item, onCancel, onSave }) {
    const [n, setN] = useState(item.name);
    const [c, setC] = useState(item.category || "");
    const [q, setQ] = useState(item.qty);

    return (
        <Styled.Item as="form" onSubmit={(e) => { e.preventDefault(); if (!n.trim()) return; onSave(item.id, { name: n.trim().slice(0, 80), category: c.trim().slice(0, 40), qty: safeQuantity(q) }); }}>
            <Styled.ItemLeft style={{ alignItems: "center" }}>
                <Styled.Input value={n} onChange={(e) => setN(e.target.value)} placeholder="Item name *" aria-label="Edit name" maxLength={80} required />
                <Styled.Input value={c} onChange={(e) => setC(e.target.value)} placeholder="Category" aria-label="Edit category" maxLength={40} style={{ maxWidth: 180 }} />
                <Styled.Input type="number" min="1" max="9999" step="1" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Edit quantity" style={{ maxWidth: 120 }} />
            </Styled.ItemLeft>
            <Styled.ItemRight>
                <Styled.PrimaryButton type="submit">Save</Styled.PrimaryButton>
                <Styled.Button type="button" onClick={onCancel}>Cancel</Styled.Button>
            </Styled.ItemRight>
        </Styled.Item>
    );
}
