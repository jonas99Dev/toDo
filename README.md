adress till projektet:
https://todo-cd4b.onrender.com/

testade lite monitorering:
https://todo-cd4b.onrender.com/metrics

adress till github:
https://github.com/jonas99Dev/toDo.git

# ----------------------

Continous Deployment:

Istället för att behöva göra manuella uppdateringar varje gång,
görs det automatiska uppateringar vid varje push till repositoryt.
Detta möjliggörs genom en s.k. deploy hook, en speciell webadress.
exv. GitHub anropar en Deploy Hook för att starta en deployment-process.

Render kan integreras med GitHub, behöver då åtkomst till GitHub-kontot för att kunna utföra en deploy.
jag har lagt in en sådan i mitt repo på github.

exempel på fördelar:

- 🚀snabbare leverans av nya funktioner
- 🎯minska manuella fel

exempel på nackdelar:

- 🛠komplexitet vid setup (CI/CD-pipelines)
- 💰kostnader för infrastruktur

exempel på CI/CD-tjänster:

- GitHub Actions
- Jenkins
- Azure Devops

![Deploy like a boss](https://media.giphy.com/media/xUPGcs4E1G8jVxoaWY/giphy.gif)

# ----------------------

Content Delivery Network (CDN)

Ett CDN är ett globalt nätverk av servrar som används för att distribuera
innehåll till användare på ett snabbare sätt. Istället för att allt innehåll laddas
från en central server, kopieras filerna till servrar på olika platser
i världen. Innehållet levereras från den server som är närmast användarens
geografiska plats.

Om en server sklulle gå offline, finnds det redundans. innehållet levereras
från en annan plats och sajten kan fortfarande vara online.

viktiga funktioner:

- caching
- Geografisk routning
- optimering

Exempel:

- Amazon
- Netflix
- Render
- GitHub-pages

Fyra viktiga aspekter:
1 - kortare laddningstider. Besökare är mindre benägna att lämna sajten.
2 - lägre bandbredds-kostnader, genom bättre användning av cache och optimering.
3 - ökad stabilitet och redundans
4 - Ökad säkerhet

exempel på nackdelar:

- kostnader
- komplexitet
- begränsad kontroll
- data- och lagringsfrågor (exv. restriktioner)

## Bonus för nördar 🎉

Visste du att CDN också kan stå för "Cool Delivery Ninja"? Nej? Då gör det det nu.
