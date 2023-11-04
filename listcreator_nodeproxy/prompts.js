const prompts = {
    "processExpressions": {
        prompt: 'Du erhältst eine Liste mit Fachbegriffen. Du erstellst für jeden Begriff eine Erklärung in einem Satz, ohne dabei den Fachbegriff zu wiederholen. Außerdem vergibst du ein Komplexitäts-Rating, das bewertet, wie schwer es ist, eine Defintion des Begriffs aus dem Stegreif vorzutragen (1-10). Der Wert 1 soll hier etwa "Kommentar" oder "HTML" entsprechen, während 10 für Begriffe wie "Quantenverschränkung" oder "Backpropagation" gedacht ist. Die Ausgabe erfolgt als JSON mit der folgenden Struktur:\n[{"expression": <String>, "description_short": <String>, "complexity": <int>}, ...]\nDeine Ausgabe ist ausschließlich die JSON, nichts anderes.\nHier die Liste:\n',
        temperature: 0.2,
        maxTokens: 3000,
    },
    "getEasyExpressions": {
        prompt: "Du erhältst eine Liste mit Fachbegriffen (diese Liste ist womöglich nur zwei Einträge lang). Deine Aufgabe ist es, diese Liste um einen zusätzlichen Begriff zu erweitern, der thematisch grob zu den anderen Begriffen passt. Der Begriff, den du hinzufügst, muss außerordentlich einfach zu erklären sein, auch für Laien. Er muss definitiv einfacher zu erklären sein als alle Begriffe auf der Liste, die du nachher erhalten wirst. Mache eine Liste mit 5 Begriffsvorschlägen, die zur Liste passen, sich aber trotzdem voneinander unterscheiden. Antworte mit nichts als einem Arraystring, der diese 5 Begriffe auf folgende Art beinhaltet: [<String>, <String>,…]\nEs ist wichtig, dass du die Strings in Quotes setzt und dass in der Antwort nichts steht, außer diesem Array. Hier ist die Liste:\n",
        temperature: 0.5,
        maxTokens: 300,
    },
    "getComplexExpressions": {
        prompt: "Du bekommst eine Liste mit Fachbegriffen (diese Liste ist womöglich nur zwei Einträge lang). Deine Aufgabe ist es, diese Liste um einen zusätzlichen Begriff zu erweitern, der thematisch grob zu den anderen Begriffen passt. Der Begriff, den du hinzufügst, muss sehr schwer zu erklären, aber trotzdem interessant sein. Mache eine Liste mit 5 Begriffsvorschlägen, die zur Liste passen, sich aber gut voneinander unterscheiden. Antworte mit nichts als einem Arraystring, der diese 5 Begriffe auf folgende Art beinhaltet: [<String>, <String>,…]\nEs ist wichtig, dass du die Strings in Quotes setzt und dass in der Antwort nichts steht, außer diesem Array. Hier ist die Liste:\n",
        temperature: 0.5,
        maxTokens: 300,
    },
}

module.exports = prompts;