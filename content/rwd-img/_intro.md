## Introduction

Les écrans récents des mobiles ont une plus grande densité de pixels.

Depuis l’écran « Retina » de l’iPhone 4 d’Apple, il y a une densité  
d’au moins 2 pixels physiques pour 1 pixel CSS.
- Soit 4 fois plus de pixels pour une taille d’écran égale
- Densité 3 sur l’iPhone 6 plus, soit 9 fois plus de pixels

[Un pixel n’est pas un pixel](http://letrainde13h37.fr/21/un-pixel-nest-pas-un-pixel/)

???

Ici on parle de pixels en tant que unité de surface (comme le m²)

article de Jérémie Patonnier de 2012

===

### L’impact sur les images

Ces écrans de meilleure qualité demandent donc qu’on leur fournisse des images
à la hauteur de leurs capacités.

Mais il ne faudrait pas envoyer aux écrans de densité 1  
l’image prévue pour un écran de densité 2 ou 3  
qui serait injustement 4 ou 9 fois plus lourde. <!-- {.fragment} -->

===

### La solution vectorielle

SVG (Scalable Vector Graphics) :
- supporté par tous les navigateurs récents,
- idéal pour les icônes, pictogramme ou graphiques,
- responsive (Scalable) par nature
- stylable et même animable

Mais n’est pas adapté à de la photo.

===

### Pour le reste

Il a fallu trouver une solution à ajouter aux standards pour répondre à cette problématique.

On parle de `<picture>` mais cela comprend aussi deux nouveaux attributs de `<img>` :
- `srcset`
- `sizes`
