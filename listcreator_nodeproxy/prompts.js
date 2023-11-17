const prompts = {
    "processExpressions": {
        prompt: 'Du erhältst eine Liste mit Fachbegriffen. Du erstellst für jeden Begriff eine Erklärung in einem Satz, ohne dabei den Fachbegriff zu wiederholen. Außerdem vergibst du ein Komplexitäts-Rating, das bewertet, wie schwer es ist, eine Defintion des Begriffs aus dem Stegreif vorzutragen (1-10). Der Wert 1 soll hier etwa "Kommentar" oder "HTML" entsprechen, während 10 für Begriffe wie "Quantenverschränkung" oder "Backpropagation" gedacht ist. Die Ausgabe erfolgt als JSON mit der folgenden Struktur:\n[{"expression": <String>, "description_short": <String>, "complexity": <int>}, ...]\nDeine Ausgabe ist ausschließlich die JSON, nichts anderes.\nHier die Liste:\n',
        temperature: 0.2,
        maxTokens: 3000,
    },
    "getEasyExpressions": {
        prompt: "Du erhältst eine Liste mit Fachbegriffen (diese Liste ist womöglich nur zwei Einträge lang). Deine Aufgabe ist es, diese Liste um einen zusätzlichen Begriff zu erweitern, der thematisch grob zu den anderen Begriffen passt. Der Begriff, den du hinzufügst, muss außerordentlich einfach zu erklären sein, auch für Laien. Er muss definitiv einfacher zu erklären sein als alle Begriffe auf der Liste, die du nachher erhalten wirst. Mache eine Liste mit 5 solchen sehr einfachen Begriffsvorschlägen, die sich jeweils voneinander unterscheiden. Antworte mit nichts als einem Arraystring, der diese 5 Begriffe auf folgende Art beinhaltet: [<String>, <String>,…]\nEs ist wichtig, dass du die Strings in Quotes setzt und dass in der Antwort nichts steht, außer diesem Array. Hier ist die Liste:\n",
        temperature: 0.5,
        maxTokens: 300,
    },
    "getComplexExpressions": {
        prompt: "Du bekommst eine Liste mit Fachbegriffen (diese Liste ist womöglich nur zwei Einträge lang). Überlege dir 1-2 übergeordnete oder angrenzende Fachgebiete, die zu diesen Begriffen passen, ohne sie zu nennen. Deine Aufgabe ist es, diese Liste um Begriffe aus diesen Fachgebieten erweitern. Diese Begriff müssen sehr schwer, deutlich schwerer als jeder andere Begriff auf der Liste, zu erklären sein. Mache eine Liste mit 5 Begriffsvorschlägen, die sich gut voneinander unterscheiden. Antworte mit nichts als einem Arraystring, der diese 5 Begriffe auf folgende Art beinhaltet: [<String>, <String>,…]\nEs ist wichtig, dass du die Strings in Quotes setzt und dass in der Antwort nichts steht, außer diesem Array. Hier ist die Liste:\n",
        temperature: 0.5,
        maxTokens: 300,
    },
}

module.exports = prompts;