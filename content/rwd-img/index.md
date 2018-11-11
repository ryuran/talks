---
title: Illustration Responsives
subtitle: Un des principaux axe d’amélioration de la performance front
description: Comment faire pour que le navigateur télécharge une image de la taille la plus adaptée ?
slug: rwd-img
dates:
  - name: CaenCamp
    place: Caen, FR
    date: 2018-11-27T18:30+0200
    url: https://www.caen.camp/talks/edition-41-illustrations-responsives
---

## Adapter la qualité

Les écrans récents sur les appareils mobiles ont une plus grande densité de pixels.

Depuis l’écran « Retina » de l’iPhone 4 d’Apple, il y a une densité de pixels physiques / CSS d’au moins 2
- Soit 4 fois plus de pixels à taille physique égale
- Densité 3 sur l’iPhone 6 plus, soit 9 fois plus de pixels

Il ne faudrait pas envoyer aux écrans de densité 1 l’image prévue pour un écran de densité 2 ou 3

[Un pixel n’est pas un pixel](http://letrainde13h37.fr/21/un-pixel-nest-pas-un-pixel/)

===

### L’attribut `srcet`

`srcset` déclare quels fichiers images sont disponibles pour les différentes densités de pixels

```html
<img src="low-res.jpg" srcset="high-res.jpg 2x, dumb-res.jpg 3x" alt=""/>
```
[Non supporté par Internet Explorer](http://caniuse.com/#feat=srcset) mais :
- fallback natif
- [un polyfill existe : « picturefill »](https://scottjehl.github.io/picturefill/)

Ce descripteur `x` n’est pertinent que pour les images de dimension CSS fixe.

===

Une même image (en termes de contenu/sens) va être affichée quelles que soient la taille du viewport et la densité de pixel.

Typiquement, une image responsive avec ces propriété css s’adaptera à la largeur de son conteneur :
```css
img {
    box-sizing : border-box;
    max-width  : 100%;
    height     : auto;
}
```

Non satisfaisant, car on envoie une image lourde aux petits écrans.

Il faut donc pouvoir envoyer une image différente selon l’espace disponible.

===

#### Le descripteur `w`

`srcset` déclare quelles largeurs d’images sont disponibles

```html
<img src="img200.jpg"
srcset="img200.jpg 200w, img600.jpg 600w, img800.jpg 800w" alt="" />
```

C’est le navigateur qui va choisir celle qui lui est le plus adaptée.

Mais le navigateur interprétant le HTML ne saura pas à quelle taille l’image sera affichée.

===

### L’attribut `sizes`

Le rôle de l’attribut `sizes` est de décrire au navigateur quelle va être la largeur d’affichage de l’image en fonction de la taille du viewport.

```html
<img src="small.jpg"
srcset="small.jpg 400w, medium.jpg 700w, large.jpg 1400w"
sizes="(min-width: 45em) 700px, 100vw" alt="" />
```

L’inconvénient principal est de devoir synchroniser les media queries entre css et html.

???

Je conseille de mettre ses breackpoints dans un fichier json qui sera importé par le JavaScript, le moteur de template et le préprocesseur css.

TP : Ajouter une image responsive avec srcset et sizes

===

## Adapter la direction artistique

Que faire quand une image, par son ratio ou son cradrage, n’est plus adaptée à la taille du viewport ?

--

Il y a donc un changement de direction artistique en fonction de la taille du viewport.

--

Cela comprend tout changement de :
- ratio
- cadrage
- contenu

===

![Point focal](assets/img/focal.png)

- recadrer une photo sur l’élément principal
- passer d’un format type banière à un format plus carré

===

### Picture

C’est le rôle de l’élement `picture`.

Il sert à enrichir une image pour lui fournir des sources alternatives en fonction de media queries.

```html
<picture>
    <source srcset="img-400x200.jpg" media="(min-width: 50em)" />
    <img src="img-200x200.jpg" alt="" />
</picture>
```

Chaque `<source>` a son propre attribut `srcset` et `sizes`.

===

### Object-fit

J’ai une image de background contribué qui doit couvrir toute une zone ?

C’est contribué, donc éditorial, ça n’est pas « que » décoratif.

On va donc opter pour un `<img>` avec `<picture>` si besoin et en css garder son positionnement et donner l’effet `cover` grace à `object-fit`.

[Le support est plutôt bon](https://caniuse.com/#feat=object-fit) et [un polyfill existe](https://github.com/bfred-it/object-fit-images/).

CSS n’a pour le moment pas d’autre moyen que les media queries pour gérer le chargement d’images adapté.

Dans la plupart des cas, une image est un choix éditorial ou iconographique.
