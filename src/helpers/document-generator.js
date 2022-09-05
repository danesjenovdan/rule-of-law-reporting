import { groupBy } from 'lodash-es';
import {
  AlignmentType,
  Document,
  ExternalHyperlink,
  Footer,
  Header,
  HeadingLevel,
  HorizontalPositionAlign,
  HorizontalPositionRelativeFrom,
  ImageRun,
  LevelFormat,
  PageBreak,
  PageNumber,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun,
  VerticalPositionAlign,
  VerticalPositionRelativeFrom,
} from 'docx';
import { getContributionsAllNestedFields } from './api.js';
import { formatDate } from './format-time.js';

const quarterInchToDXA = (qi) => (qi / 4) * 1440;

const loadImage = async (url) => {
  const response = await fetch(url);
  return response.blob();
};

function createDocumentConfig() {
  return {
    styles: {
      default: {
        document: {
          run: {
            font: 'Calibri',
            color: '000000',
            size: 22,
            bold: false,
            underline: false,
          },
          next: 'Normal',
        },
        heading1: {
          run: {
            font: 'Calibri',
            color: '000000',
            size: 32,
            bold: true,
            underline: false,
          },
          next: 'Normal',
        },
        heading2: {
          run: {
            font: 'Calibri',
            color: '000000',
            size: 28,
            bold: true,
            underline: {},
          },
          next: 'Normal',
        },
        heading3: {
          run: {
            font: 'Calibri',
            color: '000000',
            size: 26,
            bold: true,
            underline: {},
          },
          next: 'Normal',
        },
        heading4: {
          run: {
            font: 'Calibri',
            color: '000000',
            size: 22,
            bold: true,
            underline: false,
          },
          next: 'Normal',
        },
      },
      paragraphStyles: [
        {
          id: 'Normal',
          name: 'Normal',
          basedOn: 'Normal',
          next: 'Normal',
          quickFormat: true,
          run: {
            font: 'Calibri',
            color: '000000',
            size: 22,
            bold: false,
            italics: false,
            underline: false,
          },
        },
      ],
    },
    numbering: {
      config: [
        {
          reference: 'dec-list',
          levels: [
            {
              level: 0,
              format: LevelFormat.DECIMAL,
              text: '%1.',
              alignment: AlignmentType.START,
              style: {
                run: {
                  bold: true,
                  underline: false,
                },
                paragraph: {
                  indent: {
                    left: quarterInchToDXA(1),
                    hanging: quarterInchToDXA(1),
                  },
                },
              },
            },
            {
              level: 1,
              format: LevelFormat.DECIMAL,
              text: '%1.%2.',
              alignment: AlignmentType.START,
              style: {
                run: {
                  bold: false,
                  underline: false,
                },
                paragraph: {
                  indent: {
                    left: quarterInchToDXA(2.5),
                    hanging: quarterInchToDXA(1.5),
                  },
                },
              },
            },
            {
              level: 2,
              format: LevelFormat.DECIMAL,
              text: '%1.%2.%3.',
              alignment: AlignmentType.START,
              style: {
                run: {
                  bold: false,
                  underline: false,
                },
                paragraph: {
                  indent: {
                    left: quarterInchToDXA(4.5),
                    hanging: quarterInchToDXA(2),
                  },
                },
              },
            },
          ],
        },
        {
          reference: 'dec-list-main',
          levels: [
            {
              level: 0,
              format: LevelFormat.DECIMAL,
              text: '%1.',
              alignment: AlignmentType.START,
              style: {
                run: {
                  bold: true,
                  underline: {},
                },
                paragraph: {
                  indent: {
                    left: quarterInchToDXA(1),
                    hanging: quarterInchToDXA(1),
                  },
                },
              },
            },
            {
              level: 1,
              format: LevelFormat.DECIMAL,
              text: '%1.%2.',
              alignment: AlignmentType.START,
              style: {
                run: {
                  bold: true,
                  underline: {},
                },
                paragraph: {
                  indent: {
                    left: quarterInchToDXA(1.5),
                    hanging: quarterInchToDXA(1.5),
                  },
                },
              },
            },
            {
              level: 2,
              format: LevelFormat.DECIMAL,
              text: '%1.%2.%3.',
              alignment: AlignmentType.START,
              style: {
                run: {
                  bold: true,
                  underline: false,
                },
                paragraph: {
                  indent: {
                    left: quarterInchToDXA(2),
                    hanging: quarterInchToDXA(2),
                  },
                },
              },
            },
          ],
        },
      ],
    },
  };
}

function createHeader(logoBlob) {
  return new Header({
    children: [
      new Paragraph({
        children: [
          new ImageRun({
            data: logoBlob,
            transformation: { width: 100 * 0.75, height: 55 * 0.75 },
            floating: {
              verticalPosition: {
                align: VerticalPositionAlign.CENTER,
                relative: VerticalPositionRelativeFrom.PARAGRAPH,
              },
              horizontalPosition: {
                align: HorizontalPositionAlign.LEFT,
                relative: HorizontalPositionRelativeFrom.CHARACTER,
              },
            },
          }),
          new TextRun({
            text: '\tIzpis prispevkov',
            color: '666666',
            size: 16,
            italics: true,
          }),
        ],
        tabStops: [
          {
            type: TabStopType.RIGHT,
            position: TabStopPosition.MAX,
          },
        ],
      }),
    ],
  });
}

function createFooter() {
  return new Footer({
    children: [
      new Paragraph({
        children: [
          new TextRun({
            children: ['\t', PageNumber.CURRENT],
          }),
        ],
        tabStops: [
          {
            type: TabStopType.RIGHT,
            position: TabStopPosition.MAX,
          },
        ],
      }),
    ],
  });
}

function createIndex(contributionsByArea) {
  return [
    new Paragraph({
      text: 'INDEKS',
      heading: HeadingLevel.HEADING_1,
    }),
    ...Object.keys(contributionsByArea).flatMap((key, i) => {
      return [
        new Paragraph({
          children: [
            new TextRun({
              text: `Področje: ${key}`,
              size: 24,
              bold: true,
            }),
          ],
          style: 'Normal',
          spacing: { before: 200, after: 200, line: 300 },
        }),
        ...contributionsByArea[key].flatMap((contrib) => {
          return [
            new Paragraph({
              children: [
                new TextRun({
                  text: contrib['Ime prispevka'],
                  size: 22,
                  bold: true,
                }),
              ],
              style: 'Normal',
              numbering: { level: 0, reference: 'dec-list', instance: i },
              spacing: { before: 100, after: 100, line: 300 },
            }),
            ...contrib['Prispevek => Dogodek'].flatMap((event) => {
              return [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: event['Naslov dogodka'],
                      size: 22,
                      bold: false,
                    }),
                  ],
                  style: 'Normal',
                  numbering: { level: 1, reference: 'dec-list' },
                  spacing: { before: 100, after: 100, line: 300 },
                }),
                ...event['Dogodek <=> Vir'].flatMap((source) => {
                  return [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: source['Naslov vira'],
                          size: 22,
                          bold: false,
                        }),
                      ],
                      style: 'Normal',
                      numbering: { level: 2, reference: 'dec-list' },
                      spacing: { line: 300 },
                    }),
                  ];
                }),
              ];
            }),
          ];
        }),
      ];
    }),
    new Paragraph({
      text: '',
      children: [new PageBreak()],
      style: 'Normal',
    }),
  ];
}

function createDocumentListForSource(source) {
  if (!source['Dokumenti povezani z virom']) {
    return [];
  }
  let docs = [];
  try {
    docs = JSON.parse(source['Dokumenti povezani z virom']);
  } catch (e) {
    return [];
  }
  if (!docs || !docs.length) {
    return [];
  }

  return [
    new Paragraph({
      children: [
        new TextRun({
          text: 'Dokumenti:',
          size: 20,
          bold: false,
          underline: false,
        }),
      ],
      style: 'Normal',
      indent: {
        left: quarterInchToDXA(2),
      },
      spacing: { before: 200 },
    }),
    ...docs.flatMap(
      (doc) =>
        new Paragraph({
          children: [
            new TextRun({
              text: `- ${doc.title} (`,
              size: 20,
              bold: false,
              underline: false,
            }),
            new ExternalHyperlink({
              children: [
                new TextRun({
                  text: doc.url,
                  style: 'Hyperlink',
                  size: 20,
                }),
              ],
              link: doc.url,
            }),
            new TextRun({
              text: ')',
              size: 20,
              bold: false,
              underline: false,
            }),
          ],
          style: 'Normal',
          indent: {
            left: quarterInchToDXA(2),
          },
        })
    ),
  ];
}

function createAreaParagraphs(key, contribs, i) {
  return [
    new Paragraph({
      text: `Področje: ${key}`,
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 400, after: 400 },
    }),
    ...contribs.flatMap((contrib) => {
      return [
        new Paragraph({
          children: [
            new TextRun({
              text: contrib['Ime prispevka'],
              bold: true,
              underline: {},
            }),
          ],
          numbering: { level: 0, reference: 'dec-list-main', instance: i },
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 300 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: contrib['O področju prispevka'],
              size: 24,
              bold: false,
              underline: false,
            }),
          ],
          style: 'Normal',
        }),
        contrib['Prispevek => Dogodek'].length
          ? new Paragraph({
              children: [
                new TextRun({
                  text: 'Povezani dogodki:',
                  size: 22,
                  italics: true,
                  bold: false,
                  underline: false,
                }),
              ],
              style: 'Normal',
              spacing: { before: 300, after: 300 },
            })
          : undefined,
        ...contrib['Prispevek => Dogodek'].flatMap((event) => {
          return [
            new Paragraph({
              text: event['Naslov dogodka'],
              numbering: { level: 1, reference: 'dec-list-main' },
              heading: HeadingLevel.HEADING_3,
              spacing: { before: 200, after: 200 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: formatDate(event.created_at),
                  size: 22,
                  bold: false,
                  underline: false,
                }),
              ],
              style: 'Normal',
              spacing: { before: 200, after: 200 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: event[
                    'Kaj se je zgodilo in kako vpliva na vladavino prava'
                  ],
                  size: 22,
                  bold: false,
                  underline: false,
                }),
              ],
              style: 'Normal',
            }),
            ...event['Dogodek <=> Vir'].flatMap((source) => {
              return [
                new Paragraph({
                  text: source['Naslov vira'],
                  numbering: { level: 2, reference: 'dec-list-main' },
                  heading: HeadingLevel.HEADING_4,
                  indent: {
                    left: quarterInchToDXA(4),
                    hanging: quarterInchToDXA(2),
                  },
                  spacing: { before: 200, after: 0 },
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: source['Tip vira'],
                      size: 18,
                      italics: true,
                      bold: false,
                      underline: false,
                    }),
                  ],
                  style: 'Normal',
                  indent: {
                    left: quarterInchToDXA(2),
                  },
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: formatDate(source['Datum objave vira']),
                      size: 20,
                      bold: false,
                      underline: false,
                    }),
                  ],
                  style: 'Normal',
                  indent: {
                    left: quarterInchToDXA(2),
                  },
                  spacing: { before: 200 },
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: source['Avtor vira (oseba, organizacija, medij)'],
                      size: 20,
                      bold: false,
                      underline: false,
                    }),
                  ],
                  style: 'Normal',
                  indent: {
                    left: quarterInchToDXA(2),
                  },
                  spacing: { after: 200 },
                }),
                source['Datum začetka obdobja'] || source['Datum konca obdobja']
                  ? new Paragraph({
                      children: [
                        new TextRun({
                          text: `Obdobje, na katerega se navezuje vir: ${formatDate(
                            source['Datum začetka obdobja']
                          )} - ${formatDate(source['Datum konca obdobja'])}`,
                          size: 20,
                          bold: false,
                          underline: false,
                        }),
                      ],
                      style: 'Normal',
                      indent: {
                        left: quarterInchToDXA(2),
                      },
                      spacing: { before: 200, after: 200 },
                    })
                  : undefined,
                source['Povezava do vira']
                  ? new Paragraph({
                      children: [
                        new TextRun({
                          text: 'Povezava: ',
                          size: 20,
                          bold: false,
                          underline: false,
                        }),
                        new ExternalHyperlink({
                          children: [
                            new TextRun({
                              text: source['Povezava do vira'],
                              style: 'Hyperlink',
                              size: 20,
                            }),
                          ],
                          link: source['Povezava do vira'],
                        }),
                      ],
                      style: 'Normal',
                      indent: {
                        left: quarterInchToDXA(2),
                      },
                      spacing: { before: 200, after: 200 },
                    })
                  : undefined,
                ...createDocumentListForSource(source),
              ].filter(Boolean);
            }),
          ];
        }),
      ].filter(Boolean);
    }),
  ];
}

export async function createExportDocument(contributionIds) {
  const response = await getContributionsAllNestedFields({
    id: Array.from(contributionIds),
  });

  const logoBlob = await loadImage('/rolr-logo.png');

  const contributions = response.data.list;
  const contributionsByArea = groupBy(contributions, (o) => {
    return o['Področja <= Prispevek']['Ime področja'];
  });

  const documentConfig = createDocumentConfig();
  const header = createHeader(logoBlob);
  const footer = createFooter();
  const index = createIndex(contributionsByArea);
  const areas = Object.keys(contributionsByArea).flatMap((key, i) =>
    createAreaParagraphs(key, contributionsByArea[key], i)
  );

  const doc = new Document({
    ...documentConfig,
    sections: [
      {
        headers: {
          default: header,
        },
        footers: {
          default: footer,
        },
        children: [...index, ...areas],
      },
    ],
  });

  return doc;
}
