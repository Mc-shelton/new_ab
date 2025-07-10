
// const getQuarterliesBooks = async (req: IRequest, res: Response) => {
//   var { path } = req.query;
//   if (!path)
//     return res.status(400).json({
//       message: errorEnums.FIELDS,
//     });
//   try {
//     let books = await axios.get(`${base_urls.q1}${path}/pdf.json`);

//      let split = (path as string).split("/")
//      path = split[split.length - 1]
//      console.log("path", path);
     

//     console.log("books", books.data);
//     // en/quarterlies/2025-03
// //     {
// //     title: 'The Covenant and the Blueprint',
// //     start_date: '30/08/2025',
// //     end_date: '05/09/2025',
// //     id: '10',
// //     index: 'en-2025-03-10',
// //     path: 'en/quarterlies/2025-03/lessons/10',
// //     full_path: 'https://sabbath-school.adventech.io/api/v2/en/quarterlies/2025-03/lessons/10',
// //     pdfOnly: false,
// //     cover: 'https://sabbath-school.adventech.io/api/v2/images/global/2025-03/10/cover.png'
// //   },
//     if (!books.data)
//       return res.status(400).json({
//         message: "failed could not get resource",
//       });
//     const b_data = books.data.map((l: any, x: any) => {
//         l.start_date = '30/08/2025'
//         l.end_date = '05/09/2025'
//         l.path = l.src;
//       return picker(l, ["title", "start_date", "end_date", "path", "cover"]);
//     });
//     res.status(200).json({
//       message: "lessons media",
//       data: b_data,
//     });
//   } catch (err: any) {
//     const error = customErrorChecker(err);
//     if (error) return res.status(400).json({ message: err.message });
//     res.status(500).json({ message: errorEnums["SERVER"] });
//     logger.genError(err.message);
//   }
// };