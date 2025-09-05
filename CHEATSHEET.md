GoVanGoes Dev Cheatsheet — Apple Notes Version

Copy/paste friendly. Commands are on separate lines.

GIT — everyday
- git status
- git diff
- git checkout main
- git pull origin main
- git switch -c feat/your-branch-name
- git add -A
- git commit -m "your message"
- git push -u origin HEAD
- git push
- git checkout main && git pull
- git checkout -
- git merge main
- git log --oneline --graph --decorate --all
- git stash
- git pull
- git stash pop

PR link (copy the printed URL):
- git push -u origin HEAD
- echo "Open PR at: https://github.com/govangoes/calamari-crystal-site/pull/new/$(git rev-parse --abbrev-ref HEAD)"

NODE / NPM / VITE
- npm ci || npm install
- npm run dev
- npm run build
- npm run preview
- npm test

PORT BUSY FIX
- lsof -i :5173
- kill -9 PID   (replace PID)

FILE OPS (run from project root)
- cd ~/Downloads/calamari-crystal-site
- mkdir -p src/pages src/components src/assets public/images
- mv *.png public/images 2>/dev/null
- mv src/*.jsx src/components 2>/dev/null
- mv src/components/Home.jsx src/pages 2>/dev/null

CREATE / EDIT FILES (heredoc pattern)
- cat > path/to/file.ext <<'EOF'
- ... paste content ...
- EOF

SEARCH & REPLACE (macOS-safe)
- sed -i '' 's/#OLDHEX/#NEWHEX/g' src/index.css

CACHE NUKE (Tailwind/Vite)
- rm -rf node_modules/.vite && npm run dev

VERCEL (optional)
- vercel link
- vercel
- vercel --prod

TROUBLESHOOTING
- Update import paths after moving files
- Ensure index.html references /src/main.jsx and it exists
- Use a GitHub PAT for HTTPS pushes
- Don’t paste HTML into Terminal; use heredocs
- Install @vitejs/plugin-react and commit lockfile if missing
