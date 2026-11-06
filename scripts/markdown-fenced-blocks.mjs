// Include blockquotes and keep shorter nested fences inside their outer example.
export function markdownFencedBlocks(text) {
  const lines = text.replaceAll('\r\n', '\n').split('\n'), blocks = [];
  let open = null;
  for (let index = 0; index < lines.length; index++) {
    const match = /^(\s*(?:>\s*)*)\s*(`{3,}|~{3,})(.*)$/.exec(lines[index]);
    if (!match) continue;
    const depth = (match[1].match(/>/g) ?? []).length;
    if (!open) open = { start: index, marker: match[2][0], length: match[2].length, quoteDepth: depth, info: match[3].trim() };
    else if (match[2][0] === open.marker && match[2].length >= open.length && depth === open.quoteDepth && !match[3].trim()) {
      blocks.push({ ...open, end: index, closed: true, text: lines.slice(open.start, index + 1).join('\n') }); open = null;
    }
  }
  if (open) blocks.push({ ...open, end: lines.length - 1, closed: false, text: lines.slice(open.start).join('\n') });
  return blocks;
}
