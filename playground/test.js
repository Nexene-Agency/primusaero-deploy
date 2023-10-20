"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listDocuments = exports.getDocument = exports.indexDocument = void 0;
var axios_1 = require("axios");
var INDEXER_URL = "https://service:a1f42cfd-5d62-4b29-bdff-a171794e96dd@vanlifezone-search.es.northeurope.azure.elastic-cloud.com";
var READER_URL = process.env.NEXT_ELASTIC_READER_URL;
var indexDocument = function (indexName, document, as) {
    if (as === void 0) { as = "data"; }
    return new Promise(function (resolve, reject) {
        axios_1.default
            .post("".concat(INDEXER_URL, "/").concat(as, "-").concat(indexName, "/_doc/").concat(document.id), document.data)
            .then(function (res) { return resolve(res.data); })
            .catch(function (err) { return reject(err); });
    });
};
exports.indexDocument = indexDocument;
var getDocument = function (indexName, id, as) {
    if (as === void 0) { as = "data"; }
    return new Promise(function (resolve, reject) {
        axios_1.default
            .get("".concat(INDEXER_URL, "/").concat(as, "-").concat(indexName, "/_doc/").concat(id), {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(function (res) {
            var data = res.data;
            console.log("data is", data);
            if (data.found) {
                resolve({ id: data._id, data: data._source });
            }
            else {
                resolve(undefined);
            }
        })
            .catch(function (err) { return reject(err); });
    });
};
exports.getDocument = getDocument;
var testQuery = {
    query: {
        wildcard: { key: "value01*" },
    },
    sort: { key2: "desc" },
    from: 2,
    size: 3,
    _source: ["key"],
};
var listDocuments = function (indexName, query, as) {
    if (as === void 0) { as = "data"; }
    return new Promise(function (resolve, reject) {
        axios_1.default
            .post("".concat(INDEXER_URL, "/").concat(as, "-").concat(indexName, "/_search"), query, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(function (res) {
            var data = res.data;
            var result = {
                items: data.hits.hits.map(function (hit) {
                    return ({
                        id: hit._id,
                        data: hit._source,
                    });
                }),
                total: data.hits.total.value,
                query: query,
            };
            resolve(result);
        })
            .catch(function (err) {
            reject({ status: err.status, message: err.message });
        });
    });
};
exports.listDocuments = listDocuments;
// indexDocument("test", {
//   id: "test001",
//   data: { key: "value11", key2: "value22" },
// })
//   .then((res) => console.log("success", res))
//   .catch((err) => console.log("error", err));
// for (let i = 0; i < 100; i++) {
(0, exports.indexDocument)("test", {
    id: "test999",
    data: { key: "value999", key2: 999 },
})
    .then(function (res) { return console.log("success", res); })
    .catch(function (err) { return console.log("error", err); });
// }
// getDocument("test", "test001")
//   .then((res) => console.log("success", res))
//   .catch((err) => console.log("error", err));
// listDocuments("test", testQuery)
//   .then((res) => console.log("success", res))
//   .catch((err) => console.log("error", err));
