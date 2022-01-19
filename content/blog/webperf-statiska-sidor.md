---
draft: true
title: Statiska sidor för prestanda och tillgänglighet
date: 2021-10-20
---

Din server snurrar på. Inga problem - eller?

Ja, ganska säkert i alla fall - du har ju monitorering som följer med om något händer. Och inget har hänt ännu. Eller nån gång, kanske, men det löste du snabbt. Monitoreringen fungerade inte helt 100 då, men nu är det bättre. Databasen fungerar likaså, allt är fint konfigurerat. Det fungerade ju bra sist du testade för inte många dagar sedan. Eller var det över en vecka sedan, vem minns sådant? I och för sig borde du uppdatera en massa program och grejer, förstås. Men det har du inte tid för nu. Det får bli nästa vecka. Inga problem - eller?

Just det, du har en massa tredjepartens JavaScript på sidan för kommentarer och interaktivitet och sånt. Men de snurrar säkert på, hade antagligen något löfte om uptime. Och alla följer väl GDPR och så, och det noterade du väl i användarvillkoren också. Inga problem - eller?

Allt såg bra ut när du testade sidan på kontoret. Och alla andra har väl också bra uppkoppling och senaste versionen av Chrome, i alla fall nästan alla. Ibland tar det länge för kommentarerna att synas på sidan, men sådant är livet. Och du har ju dessutom ett verktyg som rapporterar fel i client-side JS. Det verktyget är superbra! Visserligen har verktyget hittat många buggar, men största delen inträffar bara med några dagars mellanrum. Det är frågan om några få användare. Inga problem - eller?

Ja, kanske vissa problem nu och då. Men det behöver inte vara så. Tänk om din sida skulle vara tillgänglig när som helst, varifrån som helst, alltid lika snabbt, och dessutom kunna läsas med alla webbläsare som finns och kommer att finnas? Det kan den - ifall du gör den till en statisk HTML sajt.

## Vad är en statisk sida?

En statisk sida är en sida som har genererats på förhand till en textfil som webbläsare förstår (färdig HTML). Ingen avancerad server behövs, inte heller någon databas. Det enda som behövs är att skicka den färdiga textfilen till användaren. Textfilen kan även läsas som sådan helt utan server, bara öppna filen i din webbläsare. En statisk sida är lite som att ha ett utskrivet papper med den färdiga websidan: du kan visa den åt vem som helst utan några extra steg eller verktyg.

Jämför detta med en "dynamisk" sida som genereras av en server. Varje gång en användare vill se en viss sida genereras den pånytt av servern. Detta innebär även att den underliggande databasen ska läsas vid varje sidvisning, eftersom själva innehållet oftast ligger i en databas. I ovannämnda analoga termer: för att visa websidan behöver du öppna mallen för sajten, söka fram själva sidans innehåll, klistra in detta i mallen och sedan skriva ut alltsammans. Detta får du göra varje gång någon vill se din webbsida. Jämför detta med att göra jobbet en gång och skriva ut en hel låda med papper redo att delas ut.

Dynamiska element kan även genereras i webbläsaren. T.ex. produktrecensioner i en e-handel är ofta genererade i webbläsaren. Oftast finns det ingen orsak att generera innehåll dynamiskt på detta vis, bortsett från att det kan vara ett enklare sätt att få upp innehållet på en sajt. Denna typ av dynamiskt innehåll är ofta ännu svårare att hantera i längden och sämre för användarupplevelsen än dynamiskt innehåll genererat av en server. En helt statisk sida har givetvis även dessa element färdigt genererade, och det är oftast enkelt att göra genom att hämta innehållet på förhand t.ex. via API:er.

## Hur blir prestandan bättre med en statisk sida?

Prestandan av en statisk sida är i princip alltid bättre än för en "dynamisk" server-genererad sida. Den stora orsaken är att det krävs mycket mindre jobb för att få sidan till användaren. Den är helt färdig och behöver endast skickas över nätverket. En enkel webserver som kan göra detta, som NGINX, är definitivt snabbare än en applikationsserver-databas-kombination, som Node och Postgres. (Notera att applikationsservern antagligen även har en s.k. "reverse proxy" framför sig - dvs. med hög sannolikhet just NGINX! :)

En annan stor orsak som gör statiska sidor snabbare är att de färdiga sidorna kan ligga i princip var som helst. Det är extremt enkelt att replikera en statisk sida till olika ställen (för att vara fysiskt nära användarna) - det enda som krävs är en copy-paste. Visst, man kan replikera servrar och databaser också, och man kan ha cache på olika nivåer (som en CDN) även med en dynamisk sida. Men båda dessa är extremt svåra att få till rätt. Däremot finns det en hel massa tjänster som kan ta en statisk sida och distribuera den över hela jorden helt automatiskt.

När det kommer till dynamiskt innehåll genererat i webbläsaren är skillnaden i många fall även större. Exemplet med produktrecensioner ovan kräver t.ex. att kod körs i webbläsaren, recensioner hämtas från tredjepartens servrar, och resultatet genereras till HTML-kod och visas. Något som ofta tar sekunder. Lägg märke till detta nästa gång du nätshoppar - hur länge tar det för hela sidan att ladda? Hoppar innehållet på sidan fram och tillbaka när mera innehåll visas? Vi har vant oss vid detta, men man kan fråga sig varför vi accepterar det, eftersom det inte behöver vara så.

## Hur blir tillgängligheten bättre med en statisk sida?

Eftersom statiska sidor har mindre rörliga delar (arkitekturen för produktionsmiljön är drastiskt enklare) är även risken för buggar och andra problem mycket mindre. Snabbare sidor med mindre uppkopplingar till tredjeparter är dessutom mera tillgängliga med äldre mobiltelefoner och sämre internetuppkopplingar. Den bästa lösningen för alla inblandade är den enklaste möjliga lösningen (även Einstein håller med här).

Tillgängligheten för statiska sidor är speciellt bättre när man jämför dem med sidor som genererar innehåll i webbläsaren. Eftersom statiska sidor är helt färdiga när de kommer till användaren kan skärmläsare och andra verktyg genast förstå sidans struktur. Dessutom kan även användare som inte kan eller vill ha JavaScript påkopplat läsa sidan i sin helhet. En stor del client-side JavaScript är dessutom optimerad för (nyaste versionen av) Google Chrome. Då är det inte alls omöjligt att någon funktion som endast stöds i Chrome tar sig in i koden - vilket är dåliga nyheter för de som inte kan eller vill anvånda just den webbläsaren.

## Börja denna resa nu!

Det finns [hur många verktyg som helst](https://jamstack.org/generators/) som kan generera statiska sidor. Själv tycker jag om dom som fungerar med [Markdown](https://www.markdownguide.org/)-filer, eftersom de är extremt lätta att jobba med. Mest har jag använt [Hugo](https://gohugo.io), som jag varmt kan rekommendera. Håller även på att bygga [mitt egna Open Source -verktyg baserat på TypeScript](https://bobsite.io), men låt oss köra med Hugo för detta. 🙂

Börja med att [installera Hugo](https://gohugo.io/getting-started/installing). Oroa dig inte, programmet finns även som fristående programfil (executable / .exe). Gör därefter en ny Hugo-sajt till mappen `statisk`:

```bash
hugo new site statisk -f yml
```

(Jag tycker personligen att YML-formatet för konfiguration är lättare att jobba med än standardvalet TOML, därav `-f yml`.)

Välj därefter tema (design) för din sajt på [themes.gohugo.io](https://themes.gohugo.io/). Det är lätt att editera dessa eller göra en helt egen design, men för detta exempel funkar ett färdigt tema fint. Jag har här valt temat "PaperMod". Gå in i sajtens mapp och ladda ner temat. (Ifall du inte har `git` installerat kan du ladda ner temat in i `themes`-mappen manuellt. Se [instruktionerna](https://github.com/adityatelange/hugo-PaperMod/wiki/Installation).)

```bash
cd statisk
git clone https://github.com/adityatelange/hugo-PaperMod themes/PaperMod --depth=1
```

Modifiera därefter sajtens konfiguration. Väljer här temat vi precis laddat ner samt ger en titel åt sajten.

`config.yml`
```yml
theme: PaperMod
title: Min statiska sajt
```

Nu kommer vi till det roliga - vår första sida! Detta blir huvudsidan på sajten. Skriv något fint och [lägg in bilder](https://www.markdownguide.org/basic-syntax/#images-1) ifall du vill. (Notera `_` i filnamnet, det är viktigt och behövs p.g.a. hur Hugo fungerar.)

`content/_index.md`
```md
# Hej på er!

Detta är min nya statiska sajt - cool eller?!
```

Starta Hugo med `hugo server`, och kolla därefter på [din nya sajt](http://localhost:1313).

```bash
hugo server
```

Så enkelt var det! Kanske du tänker dig att detta ska bli din bloggsajt, gör då en ny mapp för blogginläggen samt en index-sida för dessa (notera igen `_` i filnamnet).

`content/blogg/_index.md`
```md
---
title: Blogg
menu: main
---

Välkommen till min blogg!
```

Skriv sedan ditt första inlägg. Jag har här valt [en bild från New York](https://unsplash.com/photos/QhH_dDe5plY) som huvudbild för inlägget. Ladda ner denna, eller annan valfri bild till `static/bild.jpg` ifall du också vill ha en bild för inlägget.

`content/blogg/inlagg.md`
```md
---
title: Statiska sajter är coola
cover:
  image: bild.jpg
---

Tänkte skriva ett blogginlägg men kom inte så långt...
```

Surfa omkring på din nya sajt, och gör gärna mera spännande innehåll! När du är färdig kan du generera hela sajten till mappen `public` med ett kommando. Denna mapp kan du ladda upp till valfri hosting provider. Alternativt kan du välja en tjänst som automatiskt genererar din sajt från din Git-repository, exempelvis [Netlify](https://www.netlify.com).

```bash
hugo
```

## Hur ser du på detta?

Har du redan en statisk sida? Har du provat, men fastnat med något? Eller är du helt av annan åsikt? Jag hör gärna kommentarer eller hjälper med frågor t.ex. på [Webperfs Slack](https://webperf.se/articles/webperf-pa-slack/)!

Eric Selin
[ericselin.dev](https://ericselin.dev)
