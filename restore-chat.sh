#!/bin/bash
# Run this script AFTER fully quitting VS Code (Cmd+Q)
# Then reopen VS Code to see the recovered chat

DB_PATH="/Users/aman/Library/Application Support/Code/User/workspaceStorage/901436cb3dda20cb9a11b2ecaa3ea8c7/state.vscdb"
BACKUP_PATH="${DB_PATH}.backup"

python3 << 'PYEOF'
import sqlite3, json

for db in [
    "/Users/aman/Library/Application Support/Code/User/workspaceStorage/901436cb3dda20cb9a11b2ecaa3ea8c7/state.vscdb",
    "/Users/aman/Library/Application Support/Code/User/workspaceStorage/901436cb3dda20cb9a11b2ecaa3ea8c7/state.vscdb.backup"
]:
    conn = sqlite3.connect(db)
    cursor = conn.cursor()
    cursor.execute('SELECT value FROM ItemTable WHERE key = "chat.ChatSessionStore.index"')
    row = cursor.fetchone()
    index = json.loads(row[0])

    index['entries']['203b44e1-bdd7-470f-80c6-caacf3caf3c1'] = {
        "sessionId": "203b44e1-bdd7-470f-80c6-caacf3caf3c1",
        "title": "[Recovered] RunForce App - Initial Architecture & Setup",
        "lastMessageDate": 1773830735000,
        "isImported": True,
        "initialLocation": "panel",
        "isEmpty": False
    }

    cursor.execute('UPDATE ItemTable SET value = ? WHERE key = "chat.ChatSessionStore.index"', [json.dumps(index)])
    conn.commit()
    conn.close()
    print(f"Updated: {db.split('/')[-1]}")

print("\nDone! Now open VS Code and the recovered chat should appear in history.")
PYEOF
