# Apex IT Advisory — site vitrine

Site statique (une seule page) pour Apex IT Advisory.
Aucune dépendance, aucun build : ce sont des fichiers HTML/CSS/JS servis tels quels.

## Contenu

| Fichier | Rôle |
|---|---|
| `index.html` | La page (hero, offres, approche, à propos, contact) |
| `styles.css` | Système visuel partagé (charte jade) |
| `site.css` | Styles spécifiques à la page + accessibilité |
| `site.js` | Nav, menu mobile, formulaire de contact (mailto) |
| `fonts.css` + `fonts/` | Polices auto-hébergées (Hanken Grotesk, Clash Display) — pas de CDN, conforme CNIL |
| `assets/` | Photo optimisée, icônes, image Open Graph |
| `robots.txt`, `sitemap.xml` | Référencement |
| `site.webmanifest` | Installation type application |
| `404.html` | Page d'erreur sur la charte |
| `CNAME` | Domaine personnalisé GitHub Pages (`apexitadvisory.fr`) |

## Développer / prévisualiser en local

```bash
cd site
python3 -m http.server 8766
# puis ouvrir http://localhost:8766
```

## Déploiement — GitHub Pages + domaine OVH

1. **Créer un dépôt GitHub** vide (par ex. `apexitadvisory` sous le compte `nicolascltyd`).
2. **Pousser ce dossier** :
   ```bash
   cd site
   git init && git add -A && git commit -m "Site Apex IT Advisory"
   git branch -M main
   git remote add origin git@github.com:nicolascltyd/apexitadvisory.git
   git push -u origin main
   ```
3. **Activer Pages** : dépôt → Settings → Pages → Source = `Deploy from a branch`, branche `main`, dossier `/ (root)`.
   Le fichier `CNAME` renseigne déjà `apexitadvisory.fr`.
4. **DNS chez OVH** (zone DNS du domaine `apexitadvisory.fr`) :
   | Type | Sous-domaine | Cible |
   |---|---|---|
   | A | @ | `185.199.108.153` |
   | A | @ | `185.199.109.153` |
   | A | @ | `185.199.110.153` |
   | A | @ | `185.199.111.153` |
   | CNAME | www | `nicolascltyd.github.io.` |

   Supprimer les enregistrements A/AAAA de parking OVH existants sur `@`.
5. Dans Settings → Pages, cocher **Enforce HTTPS** une fois le certificat émis (quelques minutes à quelques heures).

Mise à jour du site ensuite : `git commit` + `git push`, Pages redéploie tout seul.
