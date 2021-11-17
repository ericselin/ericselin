---
draft: true
title: Statiska sidor för prestanda och tillgänglighet
date: 2021-10-20
---

Din server snurrar på. Inga problem - eller?

Ja, ganska säkert i alla fall - du har ju monitorering som följer med om något händer. Och inget har hänt ännu. Eller nån gång, kanske, men det löste du snabbt. Monitoreringen fungerade inte helt 100 då, men nu är det bättre. Databasen fungerar likaså, allt är fint konfigurerat. Det fungerade ju bra sist du testade för inte många dagar sedan. Eller var det över en vecka sedan, vem minns sådant? I och för sig borde du uppdatera en massa grejer, förstås. Men det har du inte tid för nu. Det får bli nästa vecka. Inga problem - eller?

Just det, du har en massa JavaScript på sidan för kommentarer och interaktivitet och sånt. Inga problem - eller?

Allt såg bra ut när du testade sidan på kontoret. Och alla har väl bra uppkoppling och senaste versionen av Chrome, i alla fall nästan alla. Ibland tar det länge för kommentarerna att synas på sidan, men sådant är livet. Och du har ju dessutom ett verktyg som rapporterar fel i client-side JS. Det verktyget är super bra! Visserligen finns där många buggar, men största delen inträffar bara med någon dags mellanrum. Det är frågan om några få användare. Inga problem - eller?

Ja, kanske vissa problem nu och då. Men det behöver inte vara så. Tänk om din sida skulle vara tillgänglig när som helst, varifrån som helst, alltid lika snabbt, och dessutom kunna läsas med alla webbläsare som finns och kommer att finnas? Det kan den - ifall du gör den till en statisk HTML sajt.

## Vad är en statisk sida?

En statisk sida är en sida som har genererats på förhand till en textfil som webbläsare förstår (färdig HTML). Ingen server behövs, inte heller någon databas, det enda som behövs är att skicka den färdiga textfilen till användaren. [...]

Jämför detta med en "dynamisk" sida som genereras av en server. Varje gång en användare vill se en viss sida genereras den pånytt av servern. Detta innebär även att den underliggande databasen ska läsas vid varje sidvisning, eftersom själva innehållet oftast ligger i en databas. [...]

Dynamiska element kan även genereras i webbläsaren. T.ex. produktrecensioner i en e-handel är ofta genererade i webbläsaren. En helt statisk sida har givetvis även dessa element färdigt genererade. [...]

## Hur blir prestandan bättre med en statisk sida?

Prestandan av en statisk sida är i princip alltid bättre än för en "dynamisk" server-genererad sida. Den stora orsaken är att det krävs mycket mindre jobb för att få sidan till användaren. Den är helt färdig och behöver endast skickas över nätverket. [...]

En annan stor orsak som gör statiska sidor snabbare är att de färdiga sidorna kan ligga i princip var som helst. Det är extremt enkelt att replikera en statisk sida till olika ställen (för att vara fysiskt nära användarna) - det enda som krävs är en copy-paste. Visst, man kan replikera servrar och databaser också, och man kan ha cache på olika nivåer (som en CDN) även med en dynamisk sida. Men båda dessa är extremt svåra att få till rätt. [...]

När det kommer till dynamiskt innehåll genererat i webbläsaren är skillnaden i många fall även större. Exemplet med produktrecensioner ovan kräver t.ex. att kod körs i webbläsaren, recensioner hämtas från tredje partens servrar, och resultatet genereras till HTML-kod och visas. Något som ofta tar sekunder. [...]

## Hur blir tillgängligheten bättre med en statisk sida?

Tillgängligheten för statiska sidor är speciellt bättre när man jämför dem med sidor som genererar innehåll i webbläsaren. Eftersom statiska sidor är helt färdiga när de kommer till användaren kan skärmläsare och andra verktyg genast förstå sidans struktur. Dessutom kan även användare som inte kan eller vill ha JavaScript påkopplat läsa sidan i sin helhet. [...]

Eftersom statiska sidor har mindre rörliga delar (arkitekturen för produktionsmiljön är drastikst enklare) är även risken för buggar och andra problem mycket mindre. Snabbare sidor med mindre uppkopplingar till tredje parter är dessutom mera tillgängliga med äldre mobiltelefoner och sämre internetuppkopplingar. [...]

## Börja denna resa nu!

[Praktisk och simpel how-to för att publicera en statisk sida.]

[Ifall ok - vill alltså inte sälja något utan hjälpa / bolla helt pro bono:] Kontakta mig gärna ifall du vill bolla mera kring detta!
