"use client";

import { useEffect, useMemo, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

async function postJson<T>(url: string, body: any): Promise<T> {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

async function sendViaMetaMask(from: string, to: string, data: string, value?: string) {
  const txHash = await (window as any).ethereum.request({
    method: "eth_sendTransaction",
    params: [{ from, to, data, value: value || "0x0" }],
  });
  return txHash as string;
}

export default function Home() {
  const [account, setAccount] = useState<string>("");
  const [chainId, setChainId] = useState<string>("");
  const [token, setToken] = useState<{ address: string; symbol: string; decimals: number } | null>(null);

  // Register form
  const [projectId, setProjectId] = useState("REFOREST-IND-2024-001");
  const [credits, setCredits] = useState("1000");
  const [projectOwner, setProjectOwner] = useState("");
  const [ipfsHashBytes32, setIpfsHashBytes32] = useState("0x" + "11".repeat(32)); // demo placeholder

  // Trading forms
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("100");
  const [spender, setSpender] = useState("");
  const [fromForTF, setFromForTF] = useState("");
  const [toForTF, setToForTF] = useState("");
  const [amountTF, setAmountTF] = useState("50");

  const connected = useMemo(() => !!account, [account]);

  useEffect(() => {
    (async () => {
      if (!(window as any).ethereum) return;
      try {
        const eth = (window as any).ethereum;
        const [addr] = await eth.request({ method: "eth_requestAccounts" });
        setAccount(addr);
        const chain = await eth.request({ method: "eth_chainId" });
        setChainId(chain);
        const t = await getJson<{ address: string; symbol: string; decimals: number }>(`${API}/api/dapp/token`);
        setToken(t);
        eth.on?.("accountsChanged", (a: string[]) => setAccount(a?.[0] || ""));
        eth.on?.("chainChanged", (c: string) => setChainId(c));
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const importToken = async () => {
    if (!token) return;
    await (window as any).ethereum.request({
      method: "wallet_watchAsset",
      params: { type: "ERC20", options: { address: token.address, symbol: token.symbol, decimals: token.decimals } },
    });
  };

  const onRegisterProject = async () => {
    if (!connected) return alert("Connect wallet first");
    const payload = await postJson<{ to: string; data: string; value: string }>(`${API}/api/dapp/build/register-project`, {
      projectId,
      carbonCredits: parseInt(credits, 10),
      projectOwner: projectOwner || account,
      ipfsHash: ipfsHashBytes32,
    });
    const hash = await sendViaMetaMask(account, payload.to, payload.data, payload.value);
    alert(`Register tx sent:\n${hash}`);
  };

  const onTransfer = async () => {
    if (!connected) return alert("Connect wallet first");
    const payload = await postJson<{ to: string; data: string; value: string }>(`${API}/api/dapp/build/transfer`, { to, amount });
    const hash = await sendViaMetaMask(account, payload.to, payload.data, payload.value);
    alert(`Transfer tx sent:\n${hash}`);
  };

  const onApprove = async () => {
    if (!connected) return alert("Connect wallet first");
    const payload = await postJson<{ to: string; data: string; value: string }>(`${API}/api/dapp/build/approve`, { spender, amount });
    const hash = await sendViaMetaMask(account, payload.to, payload.data, payload.value);
    alert(`Approve tx sent:\n${hash}`);
  };

  const onTransferFrom = async () => {
    if (!connected) return alert("Connect wallet first");
    const payload = await postJson<{ to: string; data: string; value: string }>(`${API}/api/dapp/build/transfer-from`, {
      from: fromForTF || account,
      to: toForTF,
      amount: amountTF,
    });
    const hash = await sendViaMetaMask(account, payload.to, payload.data, payload.value);
    alert(`transferFrom tx sent:\n${hash}`);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div><b>Account:</b> {account || "Not connected"}</div>
        <div style={{ opacity: 0.8 }}><b>Chain:</b> {chainId || "-"}</div>
        <div style={{ marginLeft: "auto" }}>
          <button onClick={importToken} disabled={!token} style={{ padding: "8px 12px" }}>
            Import {token?.symbol || "Token"} to MetaMask
          </button>
        </div>
      </div>

      <div style={{ height: 20 }} />

      <section style={{ background: "#111b33", borderRadius: 12, padding: 16 }}>
        <h2 style={{ marginTop: 0 }}>Register Project</h2>
        <div style={{ display: "grid", gap: 8, maxWidth: 560 }}>
          <input placeholder="Project ID" value={projectId} onChange={e => setProjectId(e.target.value)} />
          <input placeholder="Carbon Credits (uint16)" value={credits} onChange={e => setCredits(e.target.value)} />
          <input placeholder="Project Owner (address)" value={projectOwner} onChange={e => setProjectOwner(e.target.value)} />
          <input placeholder="IPFS Hash (bytes32 hex)" value={ipfsHashBytes32} onChange={e => setIpfsHashBytes32(e.target.value)} />
          <button onClick={onRegisterProject} style={{ padding: "10px 14px" }}>Register via MetaMask</button>
        </div>
        <div style={{ marginTop: 8, opacity: 0.8, fontSize: 13 }}>
          Note: ipfsHash must be 32 bytes hex (0x + 64 hex chars).
        </div>
      </section>

      <div style={{ height: 20 }} />

      <section style={{ background: "#111b33", borderRadius: 12, padding: 16 }}>
        <h2 style={{ marginTop: 0 }}>Token Trading (BCARB)</h2>

        <div style={{ display: "grid", gap: 8, maxWidth: 560 }}>
          <b>Transfer</b>
          <input placeholder="Recipient address" value={to} onChange={e => setTo(e.target.value)} />
          <input placeholder="Amount (e.g., 100)" value={amount} onChange={e => setAmount(e.target.value)} />
          <button onClick={onTransfer} style={{ padding: "10px 14px" }}>Transfer</button>
        </div>

        <div style={{ height: 12 }} />

        <div style={{ display: "grid", gap: 8, maxWidth: 560 }}>
          <b>Approve</b>
          <input placeholder="Spender address" value={spender} onChange={e => setSpender(e.target.value)} />
          <input placeholder="Amount (e.g., 300)" value={amount} onChange={e => setAmount(e.target.value)} />
          <button onClick={onApprove} style={{ padding: "10px 14px" }}>Approve</button>
        </div>

        <div style={{ height: 12 }} />

        <div style={{ display: "grid", gap: 8, maxWidth: 560 }}>
          <b>Transfer From</b>
          <input placeholder="From (owner)" value={fromForTF} onChange={e => setFromForTF(e.target.value)} />
          <input placeholder="To (recipient)" value={toForTF} onChange={e => setToForTF(e.target.value)} />
          <input placeholder="Amount (e.g., 50)" value={amountTF} onChange={e => setAmountTF(e.target.value)} />
          <button onClick={onTransferFrom} style={{ padding: "10px 14px" }}>Transfer From</button>
        </div>
      </section>
    </div>
  );
}