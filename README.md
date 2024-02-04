# Simulation de feu de forêt

Ce projet simule la propagation d'un feu de forêt en utilisant JavaScript et la bibliothèque p5.js pour le creative coding.

La forêt est représentée par une grille 2D où les cellules peuvent être non brûlées (vertes), en feu (rouges) ou brûlées (grises). Le feu peut se propager aux cellules voisines en fonction d'une probabilité de propagation prédéfinie.

## Énoncé

L'objectif est d'implémenter une simulation de la propagation d’un feu de forêt.

La forêt est représentée par une grille de dimension h x l.

La dimension temporelle est discrétisée. Le déroulement de la simulation se fait donc étape par étape.

Dans l’état initial, une ou plusieurs cases sont en feu.

Si une case est en feu à l’étape t, alors à l’étape t+1 :

- Le feu s'éteint dans cette case (la case est remplie de cendre et ne peut ensuite plus brûler)

- Et il y a une probabilité p que le feu se propage à chacune des 4 cases adjacentes

La simulation s’arrête lorsqu’il n’y a plus aucune case en feu.

Les dimensions de la grille, la position des cases initialement en feu, ainsi que la probabilité de propagation, sont des paramètres du programme stockés dans un fichier de configuration (format libre).

## Structure du code

`simulation.js`: Contient la logique principale de la simulation d'incendie.
`config.json`: Fichier de configuration permettant de modifier les paramètres de simulation.

## Setup

1) Cloner le repository
```
git clone https://github.com/YounesBessa/forest-fire-simulator.git
```
2) Lancer un serveur de développement local

3) Ouvrir le fichier HTML

Ensuite la simulation se lance automatiquement. Pour la relancer il suffit de recharger la page.

## Configuration

Les paramètres (dimensions de la grille, probabilité de la propagation du feu etc.) peuvent être modifiés dans le fichier `config.json`.
