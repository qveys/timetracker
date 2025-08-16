#!/bin/bash

# Script de réparation du repository Git corrompu
set -e

echo "🔧 Réparation du repository Git timetracker"
echo "============================================"

# Sauvegarde du répertoire de travail
echo "1. Création d'une sauvegarde..."
cd /Users/qveys/Git
cp -r timetracker timetracker_backup_$(date +%Y%m%d_%H%M%S)

cd timetracker

# Tentative de nettoyage des fichiers problématiques
echo "2. Nettoyage des fichiers trackés inappropriés..."

# Nettoyer l'index des fichiers .git/ trackés
git ls-files | grep "^\.git/" | while read file; do
    echo "Suppression de l'index: $file"
    git rm --cached "$file" 2>/dev/null || echo "Échec suppression: $file"
done

# Nettoyer .DS_Store si présent
git ls-files | grep "\.DS_Store" | while read file; do
    echo "Suppression de l'index: $file"
    git rm --cached "$file" 2>/dev/null || echo "Échec suppression: $file"
done

# Nettoyer les répertoires IDE si trackés
for pattern in ".vscode/" ".idea/"; do
    git ls-files | grep "^$pattern" | while read file; do
        echo "Suppression de l'index: $file"
        git rm --cached "$file" 2>/dev/null || echo "Échec suppression: $file"
    done
done

echo "3. Commit des changements..."
git add .gitignore
git commit -m "fix: clean up improperly tracked files and update .gitignore" || echo "Rien à commiter"

echo "4. Vérification finale..."
git status
echo ""
echo "✅ Réparation terminée!"
echo "📁 Sauvegarde créée dans: timetracker_backup_*"
