import { Router } from 'express';
import * as pdfHelper from '../pdf/pdf-helper';

const router = Router();

router.post('/', async (req, res) => {
  const result = req.body.data;

  var docDefinition = {
    // header: function (currentPage, pageCount, pageSize) {
    //   // you can apply any logic and return any valid pdfmake element

    //   return [
    //     {
    //       text: 'simple text',
    //       alignment: currentPage % 2 ? 'left' : 'right'
    //     },
    //     {
    //       canvas: [
    //         {
    //           type: 'rect',
    //           x: 170,
    //           y: 32,
    //           w: pageSize.width - 170,
    //           h: 40
    //         }
    //       ]
    //     }
    //   ];
    // },
    content: [
      { text: result.pdfTitle, style: 'header' },
      pdfHelper.addTableData(result.pdfHeaders, result.pdfModel)
    ],
    footer: function (currentPage, pageCount) {
      return [
        {
          text: currentPage.toString() + ' of ' + pageCount,
          alignment: 'right',
          style: 'footer'
        }
      ];
    },
    styles: {
      header: {
        fontSize: 15,
        bold: true,
        margin: [0, 0, 0, 10]
        // italics: true,
        // color: 'gray'
      },
      footer: {
        fontSize: 10,
        bold: true,
        margin: [10, 10, 10, 10],
        italics: true
        //color: 'gray'
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      tableExample: {
        // widths: ['auto', 'auto', 'auto', 'auto'],
        fontSize: 10,
        margin: [0, 5, 0, 15]
      },
      tableOpacityExample: {
        margin: [0, 5, 0, 15],
        fillColor: 'blue',
        fillOpacity: 0.3
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      }
    },
    defaultStyle: {
      // alignment: 'justify'
    }
  };

  pdfHelper.createPdfBinary(docDefinition, (response) =>
    res.send(response)
  );
});

export default router;
