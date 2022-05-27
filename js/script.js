const content = document.querySelector('#content');
const mobileInput = document.querySelector('#mobileInput');

function submit(text) {
    term.log.push(term.prefix + text);
    term.line = "";
    term.offset = 0;
    handleCommand(text);
    render();
}

mobileInput.addEventListener('input', (e) => {
    term.line = e.data.toString();
    term.offset = term.line.length + 1;
    render();
})

document.addEventListener('touchstart', (e) => {
    setTimeout(() => {
        mobileInput.focus();
    }, 100);
})

document.addEventListener('keydown', (e) => {
    if (e.key == "Unidentified") return;
    var preCursor = "";
    var postCursor = "";

    if (term.line) {
        preCursor = term.line.slice(0, term.offset);
        postCursor = term.line.slice(term.offset);
    }

    switch (e.key) {
        case "Backspace":
            if (term.offset > 0) {
                term.line = preCursor.slice(0, -1) + postCursor;
                term.offset--;
            }
            break;
        case "ArrowLeft":
            if (term.offset > 0) {
                term.offset--;
            }
            break;
        case "ArrowRight":
            if (term.offset < term.line.length) {
                term.offset++;
            }
            break;
        case "Enter":
            submit(term.line);
            term.line = "";
            mobileInput.value = "";
            break;
        case "ArrowUp":
            if (term.historyIndex > 0) {
                term.historyIndex--;
                term.line = term.history[term.historyIndex] || "";
                term.offset = term.line.length;
            }
            break;
        case "ArrowDown":
            if (term.history.length > 0) {
                if (term.historyIndex < term.history.length) {
                    term.historyIndex++;
                }
                term.line = term.history[term.historyIndex] || "";
                term.offset = term.line.length;
            }
            break;
        case "Delete":
            if (term.offset < term.line.length) {
                term.line = preCursor + postCursor.slice(1);
            }
            break;
        default:
            if (e.key.length === 1) {
                term.line = preCursor + e.key + postCursor;
                term.offset++;
            } else {
                console.log(e.key);
            }
            break;
    }
    render();
});

addText([
    color.lightyellow("Terminol - by ") + color.lime("LeBogo"),
    color.lime("       /^ ^\\"),
    color.lime("     ¯-\\ ᴗ / -¯"),
    color.lime("        ᴗᴗᴗ"),
    "",
    color.lightyellow("Type " + color.lightred("\"help\"") + " to get a list of all available commands."),
    "",

])

render();