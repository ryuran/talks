## Introduction

Les écrans récents des mobiles ont une plus grande __densité de pixels__.

Le premier fut l’iPhone 4 d’Apple, avec son écran « retina » de densité 2.

Depuis, on trouve des écrans de différents ratios de pixels physiques par pixel CSS.
- __2 :__ Soit __4 fois plus de pixels__ pour une taille d’écran égale
- __3 :__ (l’iPhone 6 plus par exemple), soit __9 fois plus de pixels__

[Un pixel n’est pas un pixel](http://letrainde13h37.fr/21/un-pixel-nest-pas-un-pixel/)

???

Ici on parle de pixels en tant que unité de surface (comme le m²)

Device pixel ratio

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

### Pour le reste des images

Il a fallu trouver une solution à ajouter aux standards pour répondre à cette problématique.

On parle de `<picture>` mais cela comprend aussi deux nouveaux attributs de `<img>` :
- `srcset`
- `sizes`

???

dont on va tout de suite parler
