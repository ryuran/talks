### L’attribut `sizes`

Le rôle de l’attribut `sizes` est de décrire au navigateur quelle va être la largeur d’affichage de l’image en fonction de la taille du viewport.

```html
<img src="small.jpg"
srcset="small.jpg 400w, medium.jpg 700w, large.jpg 1400w"
sizes="(min-width: 45em) 700px, 100vw" alt="" />
```

===

#### Valeur par défaut

Si l’attribut `sizes` est omis, il vaux `100vw`.

C’est à dire __100 % de la largeur du viewport__.

```html
<img src="small.jpg"
srcset="small.jpg 400w, medium.jpg 700w, large.jpg 1400w" alt="" />
```

est équivalent à :

```html
<img src="small.jpg"
srcset="small.jpg 400w, medium.jpg 700w, large.jpg 1400w" alt=""
sizes="100vw" />
```

===

#### Du plus précis au cas par défaut

```html
<img src="small.jpg"
srcset="small.jpg 400w, medium.jpg 700w, large.jpg 1400w" alt=""
sizes="(min-width: 60em) 700px, (min-width: 35em) calc(100vw - 2rem), 100vw" />
```

C’est la __première règle validée__ par le context qui sera __appliquée__.

Si mon viewport fait `600px`, que la taille de police racine est de `16px` et que la densité de pixel a un ratio de `1` : <!-- {p:.fragment} -->
- `600 / 16 = 37.5` donc `< 60em` et `>= 35em` <!-- {li:.fragment} -->
- `calc(100vw - 2rem)` <!-- {li:.fragment} -->
- `600 + 2 * 16 = 632` <!-- {li:.fragment} -->
- l’image téléchargée sera `medium.jpg` <!-- {li:.fragment} -->

???

l’exemple est sur une base de conception mobile first, uniquement des min-width.

===

#### Difficultés

- des media-queries dans le HTML <!-- {li:.fragment} -->
- parfois des media-queries destinées à cibler un `max-width` <!-- {li:.fragment} -->
- difficulté à relire, à maintenir <!-- {li:.fragment} -->
- si la mise en page css change, tous les `sizes` sont à revoir <!-- {li:.fragment} -->

???

Je conseille de mettre ses breackpoints dans un fichier json qui sera importé par le JavaScript, le moteur de template et le préprocesseur css.
