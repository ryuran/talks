### L’attribut `srcet`

- Attribut standard de la balise `<img>`
- déclare quels variantes de qualité de l’images sont disponibles

```html
<img src="low-res.jpg" srcset="low-res.jpg 1x, high-res.jpg 2x" alt=""/>
```

Quelles que soient la taille du viewport ou la densité de pixel,  
l’image doit être la même (en termes de contenu/sens),  
seule la qualité et taille du fichier change.<!-- {p:.alert.alert_warning.fragment} -->

===

#### Le descripteur `x`

```html
<img src="low-res.jpg" srcset="low-res.jpg 1x, high-res.jpg 2x" alt=""/>
```
- si le device pixel ratio est supérieur à `1` le navigateur téléchargera `high-res.jpg`
- sinon `low-res.jpg`

L’ordre n’a pas d’importance ici. <!-- {.alert.alert_info.fragment} -->

Mais ce descripteur `x` n’est pertinent que pour les images de dimension CSS fixe. <!-- {p:.fragment} -->

???

notes

===

Typiquement, une image responsive, avec les propriétés CSS suivantes, s’adaptera à la largeur de son conteneur :
```css
img {
    box-sizing: border-box;
    max-width: 100%;
    height: auto;
}
```

Le descripteur `x` n’est pas satisfaisant ici,  
car on envoie une __image plus lourde que nécessaire__ aux petits écrans. <!-- {p:.fragment} -->

Il faut donc pouvoir envoyer une image différente selon l’espace disponible. <!-- {.fragment} -->

===

#### Le descripteur `w`

Avec ce descripteur, `srcset` déclare quelles largeurs d’images sont disponibles.

```html
<img src="img200.jpg"
srcset="img200.jpg 200w, img600.jpg 600w, img800.jpg 800w" alt="" />
```

C’est le navigateur qui va choisir celle qui lui est le plus adaptée selon la __taille d’affichage__, la __densité de pixels__, la qualité de la connection, les paramètres de l’utilisateur, etc.

===

#### Le support

[Non supporté par Internet Explorer](http://caniuse.com/#feat=srcset) mais :
- fallback natif : l’attribut `src`
- un polyfill existe : [picturefill](https://scottjehl.github.io/picturefill/)

===

Mais pour que cela soit pertinent il faut que :
- le navigateur sache à quelle taille l’image devra s’afficher, <!-- {li:.fragment} -->
- dés l’interprétation du HTML, <!-- {li:.fragment} -->
- avant même d’interpréter le CSS. <!-- {li:.fragment} -->
