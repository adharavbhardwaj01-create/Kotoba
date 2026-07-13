# Free Resources for Kotoba — Research Report

**Date**: 2026-07-13
**Scope**: Free APIs, datasets, and tools for a Japanese learning app

---

## Executive Summary

Kotoba can be built entirely with free resources. The key findings:

- **Dictionary**: JMdict JSON (200K+ entries, offline) + Jisho API (online fallback)
- **Kanji**: KANJIDIC2 + KanjiVG for stroke order (both CC-licensed)
- **JLPT Data**: OpenJLPT (8,334 words, N5-N1, JSON/SQLite)
- **TTS**: VOICEVOX (40+ Japanese voices, free, offline) or Web Speech API (zero setup)
- **Speech Recognition**: Web Speech API (browser) or Vosk (48MB offline model)
- **SRS**: FSRS algorithm (MIT, ML-optimized)

---

## 1. Dictionary & Translation APIs

### Recommended: JMdict (Offline) + Jisho API (Online)

| Resource | Use | Cost | License |
|----------|-----|------|---------|
| **JMdict JSON** | Offline dictionary (200K+ entries) | Free | EDRDG (attribution) |
| **Jisho API** | Online dictionary fallback | Free | EDRDG |
| **LibreTranslate** | Self-hosted translation | Free | AGPL-3.0 |
| **Argos Translate** | Embedded offline translation | Free | MIT/CC0 |

**Skip**: Google Translate API (no permanent free tier), DeepL (limited free, paid for commercial)

**Source**: [F1.md](findings/F1.md)

---

## 2. Kanji Data

### Recommended: KANJIDIC2 + KanjiVG + JMdict

| Resource | Content | Format | License |
|----------|---------|--------|---------|
| **KANJIDIC2** | 13,000+ kanji (readings, meanings, JLPT) | XML→JSON | CC BY-SA 4.0 |
| **KanjiVG** | 10,000+ stroke order SVGs | SVG | CC BY-SA 3.0 |
| **JMdict** | 200K+ vocabulary with readings | XML→JSON | EDRDG |

**Use `scriptin/jmdict-simplified`** (GitHub, 379 stars) for pre-converted JSON — avoids XML parsing.

**Source**: [F2.md](findings/F2.md)

---

## 3. JLPT Vocabulary & Grammar

### Recommended: OpenJLPT + Imabi + FSRS

| Resource | Content | Format | License |
|----------|---------|--------|---------|
| **OpenJLPT** | 8,334 words (N5-N1), 2,211 kanji | JSON/CSV/SQLite | CC BY-SA 4.0 |
| **Imabi** | 400+ grammar lessons | Web | Free |
| **Tae Kim's Guide** | Grammar guide | Web/App | CC |
| **FSRS** | SRS algorithm | Code | MIT |

**OpenJLPT** includes example sentences (89% coverage) and has an npm package.

**Source**: [F3.md](findings/F3.md)

---

## 4. Text-to-Speech (Japanese)

### Recommended: Web Speech API (MVP) → VOICEVOX (Production)

| Service | Quality | Free Limit | Offline | Best For |
|---------|---------|------------|---------|----------|
| **Web Speech API** | Medium | Unlimited | Yes | MVP/prototype |
| **VOICEVOX** | Excellent | Unlimited | Yes | Japanese learning |
| **Azure TTS** | Excellent | 0.5M chars/mo | No | Cloud backup |
| **Google Cloud TTS** | High | 4M chars/mo | No | Production |
| **Amazon Polly** | Good | 5M chars/mo (std) | No | Budget |

**VOICEVOX** has 40+ native Japanese voices, completely free, offline-capable — ideal for language learning variety.

**Source**: [F4.md](findings/F4.md)

---

## 5. Speech Recognition (Japanese)

### Recommended: Web Speech API (Browser) → Vosk (Offline)

| Service | Accuracy | Free Limit | Offline | Best For |
|---------|----------|------------|---------|----------|
| **Web Speech API** | Moderate | Unlimited | Limited | Quick browser integration |
| **Vosk** | Good | Unlimited | Yes | Lightweight offline (48MB) |
| **Whisper** | Excellent | Unlimited | Yes | Best accuracy (GPU needed) |
| **Azure Speech** | High | 5 hrs/mo | No | Pronunciation assessment |
| **Google Cloud STT** | High | 60 min/mo | No | Cloud |

**Vosk** (48MB Japanese model) is ideal for mobile — runs on Raspberry Pi.

**Azure's pronunciation assessment** feature is perfect for language learning if cloud is acceptable.

**Source**: [F5.md](findings/F5.md)

---

## Integration Priority

### Phase 1: MVP (Now)
1. **JMdict JSON** — offline dictionary
2. **Web Speech API** — TTS + speech recognition (zero setup)
3. **OpenJLPT** — JLPT vocabulary data
4. **Gorp API** — AI conversation (already integrated)

### Phase 2: Enhanced Features
1. **KANJIDIC2 + KanjiVG** — kanji lookup + stroke order
2. **FSRS** — spaced repetition scheduling
3. **VOICEVOX** — high-quality Japanese TTS

### Phase 3: Advanced
1. **Vosk** — offline speech recognition
2. **LibreTranslate** — offline translation mode
3. **Azure pronunciation assessment** — pronunciation scoring

---

## License Compliance

All recommended resources are free for commercial use with attribution:

| Resource | License | Attribution Required |
|----------|---------|---------------------|
| JMdict | EDRDG | Yes |
| KANJIDIC2 | CC BY-SA 4.0 | Yes |
| KanjiVG | CC BY-SA 3.0 | Yes |
| OpenJLPT | CC BY-SA 4.0 | Yes |
| VOICEVOX | Free (Japanese law) | Yes |
| FSRS | MIT | No |
| Vosk | Apache 2.0 | No |

---

## Open Questions

1. **Gorp API details** — Need to verify Gorp API's actual endpoints, models, and rate limits for production use
2. **VOICEVOX web integration** — VOICEVOX engine is primarily desktop; need to verify web/WASM availability
3. **Whisper.js** — There may be a JavaScript/WebAssembly port of Whisper for browser-based offline recognition

---

## Sources

1. JMdict/EDRDG — https://www.edrdg.org/jmdict/j_jmdict.html
2. scriptin/jmdict-simplified — https://github.com/scriptin/jmdict-simplified
3. KanjiVG — https://kanjivg.tagaini.net/
4. OpenJLPT — https://github.com/evanclan/OpenJLPT
5. Imabi — https://imabi.org/
6. Tae Kim's Guide — https://guidetojapanese.org/
7. FSRS — https://github.com/open-spaced-repetition/fsrs4anki
8. VOICEVOX — https://voicevox.hiroshiba.jp/
9. Vosk — https://alphacephei.com/vosk/
10. Whisper — https://github.com/openai/whisper
11. Azure Speech — https://azure.microsoft.com/en-us/products/ai-services/text-to-speech
12. LibreTranslate — https://github.com/LibreTranslate/LibreTranslate
13. Jisho API — https://jisho.org/api/v1/search/words
14. Tatoeba — https://tatoeba.org
15. Anki — https://github.com/ankitects/anki
