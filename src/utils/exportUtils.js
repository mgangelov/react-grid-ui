export const exportHtml = (targetId) => {
  const targetElement = document.getElementById(targetId);
  const targetElementHtml = targetElement.outerHTML;
  return targetElementHtml;
};

export const exportJsonSerialisedHtml = (targetId) => JSON.stringify({
  html: exportHtml(targetId)
});

export const exportJson = (gridColumnSpec, maxGridWidth) => {
  const processedColumns = gridColumnSpec.map(columnSpec => ({
    type: 'column',
    ...columnSpec
  }));

  return JSON.stringify({
    type: 'grid',
    width: maxGridWidth,
    columns: processedColumns
  });
}