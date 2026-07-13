# Kotoba — Future Plans

> **Open Source**: No paywalls, no premium tiers — free for everyone.
> **BYOK (Bring Your Own Key)**: Users bring their own Gorp API keys — no API bills for us.
> Backend: All AI features will use **Gorp API**.

## Reference Apps

| App | What to Learn From |
|-----|--------------------|
| Duolingo | Gamification, streaks, XP system, bite-sized lessons, progress UI |
| Sakura Speak | AI conversation practice, pronunciation feedback, speaking-first approach |

## Learning Features

### Writing
- Kanji stroke-order practice with touch/mouse input
- Hiragana & Katakana writing drills
- Free-form writing with AI feedback

### Reading
- Graded reader articles (N5 → N1)
- News articles simplified by level
- Manga-style panels with furigana toggle

### Listening
- Dictation exercises (hear → type what you heard)
- Audio speed control (slow → native)
- Song lyric fill-in-the-blank

### Speaking
- AI conversation role-play (restaurant, train station, job interview)
- Pronunciation scoring with phoneme-level feedback
- Shadowing practice (repeat after native audio)

### Vocabulary
- Spaced repetition scheduling
- Personalized vocab from mistakes
- Custom deck creation with images
- Contextual sentence building

### Grammar
- Pattern drills (particles, verb conjugation)
- Sentence reordering exercises
- Fill-in-the-blank with grammar focus

### Progress
- JLPT level tracking (N5 → N1)
- Daily streaks with rewards
- Skill tree visualization
- Weak area identification

## User Interface Design

### Visual Theme
- Japanese paper (washi) texture background
- Color palette: indigo, vermillion, bamboo green, gold accents
- Shippori Mincho for display text, Zen Kaku Gothic New for body
- JetBrains Mono for code/romaji
- Subtle dot grid pattern overlay

### Navigation
- Side tab rail for main sections
- Breadcrumb navigation within lessons
- Swipe gestures on mobile for lesson progression
- Floating action button for quick actions

### Lesson Flow
- Card-based lesson steps (swipe or tap to advance)
- Progress bar at top of each lesson
- Animated transitions between steps
- Celebration animations on completion (stamps, confetti)

### Feedback & Interactions
- Visual feedback on correct/incorrect answers
- Haptic feedback on mobile for interactions
- Tooltips for grammar points and new vocab
- Audio playback controls with speed options

### Accessibility
- High contrast mode
- Adjustable text size
- Screen reader support
- Keyboard navigation for all features

### Responsive Layout
- Mobile-first design
- Tablet: two-column layout (lesson + reference)
- Desktop: sidebar + main content area
- Adaptive typography scaling

## Gamification Elements

### Points & XP
- XP earned per lesson completed
- Bonus XP for streaks, perfect scores, speed
- Level-up system (bronze → silver → gold → master)
- XP multipliers for harder content

### Streaks & Rewards
- Daily login streak counter
- Streak freeze items (protect missed days)
- Milestone rewards (7-day, 30-day, 100-day)
- Unlockable themes and avatars at milestones

### Challenges & Competitions
- Weekly challenges (learn 50 new words, complete 10 lessons)
- Timed speed rounds
- Head-to-head duels with other learners
- Global and friend leaderboards

### Unlockables
- New lesson themes and skins
- Character/avatar customization
- Special lesson types (manga, anime clips)
- Badge collection for achievements

### Progress Visualization
- Skill tree with branching paths
- Circular progress rings per skill area
- Heat map of daily activity
- Stats dashboard (words learned, time studied, accuracy)

### Social Features
- Friends list and activity feed
- Share progress to social media
- Study groups with shared goals
- Mentorship system (advanced → beginner)

## Technical Architecture

### Frontend
- React 19 + Vite
- Single-page application
- Component-based architecture
- Responsive design (mobile → desktop)

### Authentication & Cloud Sync
- Google OAuth login (one-tap sign-in)
- Cloud sync for progress, decks, and settings
- Multi-device support (phone, tablet, desktop)
- Offline-first with sync when online
- Conflict resolution for concurrent edits

### Data Storage
- Local: IndexedDB for offline access
- Cloud: Firestore or Supabase for synced data
- User profile, progress, custom decks, streaks
- End-to-end encryption for sensitive data

### API Layer
- Gorp API for AI features (chat, deck generation, translation)
- REST or GraphQL for app data
- Rate limiting and caching
- Error handling and retry logic

### Deployment
- Vercel or Netlify for frontend hosting
- CDN for static assets
- Environment-based configuration
- CI/CD pipeline for automated deploys

### Security
- API key management (env vars, not exposed to client)
- Input validation and sanitization
- HTTPS everywhere
- GDPR compliance for user data

## Data Privacy & Compliance

### User Data
- Collect only what's needed for learning (progress, preferences, vocab)
- No selling of user data to third parties
- Transparent privacy policy in plain language
- User dashboard showing all stored data

### GDPR Compliance
- Right to access: users can download their data
- Right to deletion: account and all data deleted on request
- Right to portability: export data in standard formats
- Consent management: clear opt-in for data collection
- Data minimization: only collect what's necessary

### CCPA Compliance (California)
- "Do Not Sell My Personal Information" option
- Opt-out of data sharing
- Same deletion and access rights as GDPR

### Children's Privacy (COPPA)
- Age verification at signup
- Parental consent for users under 13
- Limited data collection for minors
- No targeted advertising to children

### Data Security
- Encryption at rest and in transit
- Regular security audits
- Incident response plan
- Third-party vendor compliance checks

### Voice & Audio Data
- Audio recordings processed locally when possible
- Cloud audio deleted after processing
- No permanent storage of voice data
- Clear disclosure of audio usage

### Analytics & Tracking
- Anonymous usage analytics only
- No invasive tracking or profiling
- Opt-in for feature usage analytics
- Easy opt-out in settings

## Feature Checklist

### Core Learning
- [ ] Kanji stroke-order practice
- [ ] Grammar lessons with pattern drills
- [ ] Reading practice (graded readers)
- [ ] JLPT level-based progression (N5 → N1)

### Dictionary & Reference
- [ ] Offline dictionary (JMdict JSON)
- [ ] Kanji lookup with readings/meanings
- [ ] Stroke order visualization (KanjiVG)
- [ ] Example sentences (Tatoeba)

### Gamification
- [ ] Daily streaks with rewards
- [ ] Leaderboards / progress sharing
- [ ] Challenge mode (timed quizzes, speed rounds)

### AI Features
- [ ] Conversation role-play scenarios
- [ ] Personalized vocab from mistakes
- [ ] Pronunciation scoring
- [ ] Contextual sentence building

### UI & Experience
- [ ] Dark mode
- [ ] Offline mode
- [ ] Export / import progress
- [ ] Custom deck creation
- [ ] Spaced repetition scheduling

### Tech & Infrastructure
- [x] Gorp API integration (replace Claude)
- [ ] Google OAuth login
- [ ] Cloud sync (multi-device)
- [ ] IndexedDB for offline storage

### Free Resources (Researched 2026-07-13)
- [x] Dictionary: JMdict JSON (200K+ entries, offline) + Jisho API (online fallback)
- [x] Kanji Data: KANJIDIC2 + KanjiVG (stroke order SVGs, CC-licensed)
- [x] JLPT Data: OpenJLPT (8,334 words, N5-N1, JSON/SQLite)
- [x] TTS: Web Speech API (MVP) → VOICEVOX (production, 40+ voices)
- [x] Speech Recognition: Web Speech API (browser) → Vosk (48MB offline)
- [x] SRS: FSRS algorithm (MIT, ML-optimized)
- Full report: `research/kotoba-free-resources/REPORT.md`

### Privacy & Compliance
- [ ] Privacy policy
- [ ] GDPR compliance
- [ ] CCPA compliance
- [ ] COPPA (children's privacy)

## Ideas Backlog

- (none yet)
