# Kancelaria Klimas — strona one-page

Nowoczesna jednostronicowa witryna dla **Kancelarii Radców Prawnych Krystiana Klimas i Norberta Klimas** (Opole &amp; Ozimek). Treść została zaczerpnięta z oryginalnej strony `kancelariaklimas.pl`.

## Stack

- czysty **HTML5** + **CSS3** (custom properties, grid, flex)
- minimalny **JavaScript** (vanilla) — scrollspy, mobilne menu, animacje, walidacja formularza
- fonty Google: *Cormorant Garamond* (serif) + *Inter* (sans)
- logo: `logo_klimas.png` (z katalogu projektu)
- bez frameworków, bez build-stepów

## Struktura plików

```
klimas_www/
├── index.html        # struktura strony i treści
├── styles.css        # design system + sekcje + responsywność
├── script.js         # nawigacja, scrollspy, animacje, formularz
├── logo_klimas.png   # logo używane w nav i stopce
└── README.md
```

## Sekcje strony

1. **Hero** — nagłówek z CTA i statystykami (30+ lat, 2 biura, 11 specjalizacji)
2. **O firmie** — historia kancelarii + 3 karty z kluczowymi atutami
3. **Oferta** — 11 obszarów prawa + obsługa w języku niemieckim
4. **Zespół** — Norbert Klimas (1999) i Krystian Klimas (2013)
5. **Kariera** — informacje o rekrutacji aplikantów i prawników
6. **RODO** — linki do oryginalnych klauzul informacyjnych (PDF)
7. **Kontakt** — biuro w Opolu, biuro w Ozimku, formularz kontaktowy
8. **Stopka** — copyright, polityka cookies

## Uruchomienie

Wystarczy otworzyć `index.html` w przeglądarce. Dla pełnej funkcjonalności (np. fonty, formularz) zalecany jest lokalny serwer:

```bash
# Python 3
python3 -m http.server 8080

# Node (npx)
npx serve .
```

Następnie otwórz <http://localhost:8080>.

## Co warto uzupełnić przed produkcją

- **Adres e-mail** kancelarii — w `index.html` użyto placeholderu `kontakt@kancelariaklimas.pl` (oryginalna strona maskuje adres). Zaktualizuj wszystkie wystąpienia.
- **Backend formularza** — obecny formularz jest tylko walidowany po stronie klienta. Należy podpiąć usługę typu Formspree, własny endpoint PHP/Node lub mailto.
- **Mapa Google** — sekcja Kontakt zawiera linki do Google Maps. Można podmienić na osadzony `<iframe>` z konkretnymi pinami.
- **Dokumenty PDF** — linki RODO wskazują obecnie na pliki na oryginalnej domenie `kancelariaklimas.pl`. Po przeniesieniu do nowej domeny należy je przegrać lokalnie do katalogu `files/`.
- **SEO** — tytuł i meta description są ustawione, warto dołożyć Open Graph + sitemap.xml + robots.txt.

## Paleta kolorów

| Kolor       | Hex       | Zastosowanie                      |
| ----------- | --------- | --------------------------------- |
| Granatowy   | `#0b1d3a` | Główny kolor marki, hero, kontakt |
| Złoty       | `#c9a96a` | Akcenty, CTA, eyebrows            |
| Papier      | `#faf8f4` | Tło sekcji jasnych                |
| Atrament    | `#14182a` | Tekst nagłówków                   |
| Tekst soft  | `#4a5168` | Tekst opisowy                     |

## Dostępność i wydajność

- semantyczny HTML, `aria-label` na ikonach i nawigacji
- skiplinks pominięte na rzecz prostej, czytelnej nawigacji + scrollspy
- `prefers-reduced-motion` wyłącza animacje
- jeden plik CSS i JS — szybkie ładowanie, brak frameworków
