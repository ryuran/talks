
## Object-fit

```css
img { object-fit: cover }
```

Cette propriété CSS peut être utilisée sur `<img>` et `<video>`.

Cette propriété indique comment le média doit être rendu dans le viewport de l’élément.

Si vous connaissez `background-size: cover` et `background-size: contain`,  
le principe est le même.

[Le support est plutôt bon](https://caniuse.com/#feat=object-fit) et des polyfills existent, dont ma recomandation : [object‑fit‑images](https://github.com/bfred-it/object-fit-images/).

===

### Les valeurs

`fill`
: Valeur par défaut, l’image se déforme pour couvrir la zone.

`contain`
: L’image sera entièrement rendu dans la zone, avec espaces « blanc » à gauche et à droite ou en haut et en bas, selon la dimension limitante.

`cover`
: L’image couvre entièrement la zone, rognée à gauche et à droite ou en haut et en bas, selon la dimension limitante.

===

`none`
: L’image est rendu a sa taille physique rogné par le viewport.

`scale-down`
: La plus petite taille de rendu entre `contain` et `none`.

Pour plus de détails, voir [la documentation MDN](https://developer.mozilla.org/fr/docs/Web/CSS/object-fit).

===

### Object-position

C’est à `object-fit` ce que `background-position` est au `background-size`.

Tout comme `background-position`, `object-position` prend 2 valeur :
- la position horizontale
- la position verticale

Les valeurs possibles sont exactement les même que `background-position`. <!-- {.fragment} -->

===

On a dis que `object-fit: cover` rognait à gauche et à droite si la dimension limitante était la hauteur.

Mais si :

```css
img {
  object-position: left center;
}
```

L’image ne sera rognée qu’à droite. <!-- {.fragment} -->

===

Pour plus de détails, voir [la documentation MDN](https://developer.mozilla.org/fr/docs/Web/CSS/object-fit).

Attention, on ne peut pas remplacer entièrement les images de fonds en CSS, `object-repeat` n’existe pas. <!-- {p:.alert.alert_warning} -->
