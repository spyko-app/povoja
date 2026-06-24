"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type CartItem = { name: string; price: string; priceOld?: string };

type CheckoutCtx = {
  open: (item: CartItem) => void;
};

const Ctx = createContext<CheckoutCtx | null>(null);

export function useCheckout() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCheckout precisa do CheckoutProvider");
  return ctx;
}

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [item, setItem] = useState<CartItem | null>(null);
  const [pay, setPay] = useState<"pix" | "card">("pix");
  const [done, setDone] = useState(false);

  const open = useCallback((it: CartItem) => {
    setItem(it);
    setDone(false);
    setPay("pix");
  }, []);

  const close = useCallback(() => setItem(null), []);

  useEffect(() => {
    if (!item) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [item, close]);

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      {item && (
        <div className="modal-overlay" onClick={close}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" aria-label="Fechar" onClick={close}>
              ×
            </button>
            {done ? (
              <div className="modal-success">
                <div className="big">✊</div>
                <h3>Pedido recebido!</h3>
                <p>
                  Sua munição está a caminho. Bora pra cima da direita — o povo
                  unido jamais será vencido.
                </p>
                <button
                  className="btn btn-vermelho btn-block"
                  style={{ marginTop: 22 }}
                  onClick={close}
                >
                  Voltar
                </button>
              </div>
            ) : (
              <>
                <div className="modal-head">
                  <div className="tag">Finalizar pedido</div>
                  <h3>{item.name}</h3>
                  <div className="price">
                    <b>{item.price}</b>
                    {item.priceOld && <s>{item.priceOld}</s>}
                  </div>
                </div>
                <div className="modal-body">
                  <ul>
                    <li>Arquivos em alta, sem marca d&apos;água</li>
                    <li>Acesso imediato após o pagamento</li>
                    <li>Pagamento via Pix ou cartão</li>
                    <li>Sem mensalidade: pague uma vez só</li>
                    <li>Ambiente de pagamento seguro</li>
                  </ul>
                  <div className="pay-toggle">
                    <button
                      className={`pay-opt ${pay === "pix" ? "active" : ""}`}
                      onClick={() => setPay("pix")}
                    >
                      Pix
                      <small>Liberação na hora</small>
                    </button>
                    <button
                      className={`pay-opt ${pay === "card" ? "active" : ""}`}
                      onClick={() => setPay("card")}
                    >
                      Cartão
                      <small>Em até 3x</small>
                    </button>
                  </div>
                  <button
                    className="btn btn-vermelho btn-block btn-lg"
                    onClick={() => setDone(true)}
                  >
                    Pagar com {pay === "pix" ? "Pix" : "cartão"} · {item.price}
                  </button>
                  <p className="modal-note">
                    🔒 Ambiente de demonstração. Nenhuma cobrança é feita.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}
