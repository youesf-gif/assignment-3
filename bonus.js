/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
    if (strs.includes("")) return "";
    if (strs.length === 1) return strs[0];

    let fStr = strs[0];

    for (let i = 1; i < strs.length; i++) {
        if (strs[i].slice(0, fStr.length) !== fStr) {
            fStr = fStr.length >= 1 ? fStr.slice(0, -1) : "";
            i = 0;
            continue;
        }
        if (i === strs.length - 1) {
            return fStr;
        }
    }
};
