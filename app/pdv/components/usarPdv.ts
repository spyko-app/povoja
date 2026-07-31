"use client";

import { useEffect, useState } from "react";
import { lerConfig, lerProdutos } from "../../lib/pdv/storage";
import { CONFIG_PADRAO, type ConfigPdv, type Produto } from "../../lib/pdv/types";

/**
 * Carrega config e catálogo do localStorage depois da montagem — o primeiro
 * render precisa bater com o HTML do servidor.
 */
export function usarPdv() {
  const [config, setConfig] = useState<ConfigPdv>(CONFIG_PADRAO);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    setConfig(lerConfig());
    setProdutos(lerProdutos());
    setPronto(true);
  }, []);

  return { config, setConfig, produtos, setProdutos, pronto };
}
