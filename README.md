# Plataforma ONG – Ajustada (Dropdown desktop + Hambúrguer mobile)

Ajustes aplicados:
- **Dropdown desktop** alinhado à direita do item e deslocado 8px para baixo.
- **Menu mobile (hambúrguer)** como painel full-width abaixo do header; fecha ao clicar em links; `aria-expanded` atualizado.
- Estrutura CSS modular (tokens/base/layout/components/utilities) e JS com máscaras/validação/toast/modal.

Arquivos modificados principais:
- `assets/css/layout.css` → posicionamento do submenu (desktop) e painel mobile.
- `assets/js/main.js` → controle de `aria-expanded`, fechamento automático e clique do dropdown no mobile.
