1️⃣ Adding IDs to the Boards (Default + Dynamic)

✅ This is crucial for tracking boards uniquely in localStorage and ensuring tasks get assigned to the right board.
Suggestion: Use a UUID (Date.now() or a random string) to create unique board IDs instead of relying on board names.
2️⃣ Storing Boards in Local Storage

✅ This ensures that all created boards persist across sessions.
Extra Step: Ensure board deletion updates localStorage and removes tasks inside that board.
3️⃣ Adding IDs to Tasks (Dynamic Tasks)

✅ Every task should have a unique ID to make modifications (edit, delete) easier.
Suggestion: Same as boards, use a UUID to ensure uniqueness.
4️⃣ Linking Tasks to Boards via IDs

✅ This is essential for keeping tasks in the right board.
Implementation Tip: Each task object in localStorage should store its parent board ID.
5️⃣ Storing Tasks in Local Storage

✅ Helps persist task data.
Extra Step: Ensure that drag-and-drop updates localStorage, so tasks remain in the correct board even after a refresh.
6️⃣ Rendering Boards on Page Load

✅ If a board is missing, append it dynamically.
Potential Issue: Make sure duplicate boards don’t appear if localStorage already has them.
7️⃣ Rendering Tasks in the Correct Board

✅ Correctly place tasks inside their parent board.
Extra Step: Attach event listeners (drag, edit, delete) when tasks are loaded dynamically.
