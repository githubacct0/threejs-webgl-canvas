export default class Footer {
    constructor() {
        this.init();
    }
    init() {
        function splitLines(container, opentag, closingtag) {
            var spans = container.children,
                top = 0,
                tmp = '';
            container.innerHTML = container.textContent.replace(/\S+/g, '<n>$&</n>');
            for (let i = 0; i < spans.length; i++) {
                var rect = spans[i].getBoundingClientRect().top;
                if (top < rect) tmp += closingtag + opentag;
                top = rect;
                tmp += spans[i].textContent + ' ';
            }
            container.innerHTML = tmp += closingtag;
        }

        if ($('.article_inner')[0]) {
            splitLines(document.querySelectorAll('.article_inner li h3')[0], '<span>', '</span>')
            splitLines(document.querySelectorAll('.article_inner li h3')[1], '<span>', '</span>')
            splitLines(document.querySelectorAll('.article_inner li h3')[2], '<span>', '</span>')
        }

    }
}
