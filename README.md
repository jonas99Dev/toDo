adress till projektet:
https://todo-cd4b.onrender.com/

testade lite monitorering:
https://todo-cd4b.onrender.com/metrics

adress till github:
https://github.com/jonas99Dev/toDo.git

Continous Deployment:

Istället för att behöva göra manuella uppdateringar varje gång, görs det automatiska uppateringar vid varje push.
Genom att exv. GitHub anropar en speciell webbadress (en Deploy Hook). Render behöver åtkomst till GitHub-kontot för att kunna utföra en deploy.

jag har lagt in en sådan i mitt repo på github.

Content Delivery Network (CDN)

Tekniken bygger på att static sites har kopior av webbplatsfilerna på flera ställen i världen. Det gör att latencyn blir lägre, eftersom det geografiska avståndet blir kortare, och det finns redundans, om en server sklulle gå offline.
Exempelvis använder Amazon, Netflix, Render och GitHub-pages den här tekniken.

Fyra viktiga aspekter:
1 - kortare laddningstider. Besökare är mindre benägna att lämna sajten.
2 - lägre bandbredds-kostnader, genom bättre användning av cache och optimering.
3 - ökad stabilitet och redundans
4 - Ökad säkerhet
