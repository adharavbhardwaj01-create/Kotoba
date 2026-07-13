import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useEffect } from "react"
import { useAppStore } from "./store/appStore"
import GlobalStyle from "./styles/GlobalStyle"
import Layout from "./components/layout/Layout"
import ChatTab from "./components/chat/ChatTab"
import AlphabetTab from "./components/alphabet/AlphabetTab"
import VocabTab from "./components/vocab/VocabTab"
import DictionaryTab from "./components/dictionary/DictionaryTab"
import TranslateTab from "./components/translate/TranslateTab"

function LoadingScreen() {
  return (
    <div className="kotoba-root" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <GlobalStyle />
      <div className="disp" style={{ fontSize: 20, color: "var(--ink-soft)" }}>読み込み中…</div>
    </div>
  )
}

export default function App() {
  const { ready, initProgress } = useAppStore()

  useEffect(() => {
    initProgress()
  }, [initProgress])

  if (!ready) return <LoadingScreen />

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/chat" replace />} />
          <Route path="/chat" element={<ChatTab />} />
          <Route path="/alphabet" element={<AlphabetTab />} />
          <Route path="/vocab" element={<VocabTab />} />
          <Route path="/dictionary" element={<DictionaryTab />} />
          <Route path="/translate" element={<TranslateTab />} />
          <Route path="*" element={<Navigate to="/chat" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
