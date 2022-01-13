(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{"../../node_modules/.pnpm/@storybook+addon-docs@6.4.8_9780b16a8df2adbd475ff3548a07e5c4/node_modules/@storybook/addon-docs/dist/esm/index.js":function(module,__webpack_exports__,__webpack_require__){"use strict";var _blocks__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../node_modules/.pnpm/@storybook+addon-docs@6.4.8_9780b16a8df2adbd475ff3548a07e5c4/node_modules/@storybook/addon-docs/dist/esm/blocks/index.js");__webpack_require__.d(__webpack_exports__,"a",(function(){return _blocks__WEBPACK_IMPORTED_MODULE_0__.AddContext})),__webpack_require__.d(__webpack_exports__,"b",(function(){return _blocks__WEBPACK_IMPORTED_MODULE_0__.Meta})),__webpack_require__.d(__webpack_exports__,"c",(function(){return _blocks__WEBPACK_IMPORTED_MODULE_0__.Primary})),__webpack_require__.d(__webpack_exports__,"d",(function(){return _blocks__WEBPACK_IMPORTED_MODULE_0__.Title}))},"./src/Utilities.stories.mdx":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"__page",(function(){return __page}));__webpack_require__("../../node_modules/.pnpm/react@17.0.2/node_modules/react/index.js");var _mdx_js_react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../node_modules/.pnpm/@mdx-js+react@1.6.22_react@17.0.2/node_modules/@mdx-js/react/dist/esm.js"),_storybook_addon_docs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/.pnpm/@storybook+addon-docs@6.4.8_9780b16a8df2adbd475ff3548a07e5c4/node_modules/@storybook/addon-docs/dist/esm/index.js");function _extends(){return _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}const layoutProps={};function MDXContent({components:components,...props}){return Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("wrapper",_extends({},layoutProps,props,{components:components,mdxType:"MDXLayout"}),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)(_storybook_addon_docs__WEBPACK_IMPORTED_MODULE_2__.b,{title:"Utilities",mdxType:"Meta"}),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("h2",{id:"utilities"},"Utilities"),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("p",null,"The library exposes a number of utility functions, which are documented below, as well as all the enums and types used by these utility functions.\nIn most cases, you'll only need ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"p"},"getDomain")," and/or ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"p"},"useDomain"),"."),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("h4",{id:"getdomain"},"getDomain"),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("p",null,"Find the min and max values contained in a array (or ndarray) of numbers. If ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"p"},"scaleType")," is ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"p"},"ScaleType.Log")," and the domain crosses zero, clamp the min to the first positive value or return ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"p"},"undefined")," if the domain is not supported (i.e. ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"p"},"[-x, 0]"),")."),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("pre",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("code",{parentName:"pre",className:"language-ts"},"getDomain(values: NdArray | number[], scaleType: ScaleType = ScaleType.Linear): Domain | undefined\n\nconst linearDomain = getDomain([10, 5, -1]); // [-1, 10]\nconst logDomain = getDomain([-1, 2, 10], ScaleType.Log); // [2, 10]\n\nconst myArray = ndarray([0, 1, 2, 3], [2, 2]);\nconst myDomain = getDomain(myArray); // [0, 3]\n")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("h4",{id:"getdomains"},"getDomains"),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("p",null,"Find the domains of multiple arrays (or ndarrays) of numbers. Useful when dealing with auxiliary curves."),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("pre",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("code",{parentName:"pre",className:"language-ts"},"getDomains(arrays: (NdArray | number[])[], scaleType: ScaleType = ScaleType.Linear): (Domain | undefined)[]\n\nconst linearDomains = getDomains([[-1, 5, 10], myArray]); // [[-1, 10], [0, 3]]\nconst logDomains = getDomains([[-1, 5, 10], myArray], ScaleType.Log); // [[2, 10], [0, 3]]\n")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("h4",{id:"getcombineddomain"},"getCombinedDomain"),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("p",null,"Combine multiple domains into one. Useful to find the overall domain of a line visualization with auxiliary curves."),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("pre",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("code",{parentName:"pre",className:"language-ts"},"getCombinedDomain(domains: (Domain | undefined)[]): Domain | undefined\n\nconst combinedDomain = getCombinedDomain([[-1, 10], [0, 30]]]); // [-1, 30]\n")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("h4",{id:"extenddomain"},"extendDomain"),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("p",null,"Extend a domain by a factor in a given scale."),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("pre",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("code",{parentName:"pre",className:"language-ts"},"extendDomain(domain: Domain, extendFactor: number, scaleType: ScaleType = ScaleType.Linear): Domain\n\nconst extendedDomain1 = extendDomain([0, 100], 0.5]); // [-50, 150]\nconst extendedDomain2 = extendDomain([10, 100], 1, ScaleType.Log); // approx. [1, 1000]\nconst extendedDomain3 = extendDomain([2, 2], 0.5); // [1, 3]\nconst extendedDomain4 = extendDomain([1, 1], 1, ScaleType.Log); // [0.1, 10]\n")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("h4",{id:"getlineargradient"},"getLinearGradient"),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("p",null,"Generate a CSS linear gradient for a given D3 interpolator, to be used as ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"p"},"background-image"),". If ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"p"},"minMaxOnly")," is ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"p"},"true"),", the gradient will include only two colours stops."),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("pre",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("code",{parentName:"pre",className:"language-ts"},"getLinearGradient(interpolator: D3Interpolator, direction: 'top' | 'bottom' | 'right' | 'left', minMaxOnly = false): string\n")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("h4",{id:"getvisdomain"},"getVisDomain"),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("p",null,"Determine the domain to be used for the visualization based on a user-selected custom domain. If a bound of the custom domain is ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"p"},"null"),", it falls back to the corresponding bound of the data domain."),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("pre",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("code",{parentName:"pre",className:"language-ts"},"getVisDomain(customDomain: CustomDomain, dataDomain: Domain): Domain\n\nconst visDomain1 = getVisDomain([null, null], [0, 100]); // [0, 100]\nconst visDomain2 = getVisDomain([null, 20], [0, 100]); // [0, 20]\n")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("h4",{id:"getsafedomain"},"getSafeDomain"),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("p",null,"Determine a domain that is safe for the visualization. This is typically called with a user-defined ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"p"},"customDomain"),", or with a ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"p"},"visDomain")," as returned by ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"p"},"getVisDomain()"),".\nIf the domain is determined to be unsafe, a safe domain based on ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"p"},"fallbackDomain")," is returned along with an error object. Note that ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"p"},"fallbackDomain")," is assumed to be safe.\nThe domain is considered unsafe if it's inverted (",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"p"},"min > max"),"), or if the scale is log and at least one of the bounds is negative."),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("pre",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("code",{parentName:"pre",className:"language-ts"},"getSafeDomain(domain: Domain, fallbackDomain: Domain, scaleType: ScaleType): [Domain, DomainErrors]\n\nconst safeDomain1 = getSafeDomain([-10, 50], [1, 100], ScaleType.Linear]); // [0, 50]\nconst safeDomain2 = getSafeDomain([-10, 50], [1, 100], ScaleType.Log]); // [1, 50]\nconst safeDomain3 = getSafeDomain([-50, -10], [1, 100], ScaleType.Log]); // [1, 100]\nconst safeDomain4 = getSafeDomain([-10, 50], [80, 100], ScaleType.Log]); // [50, 50] => log-safe min (80) is greater than max (50)\n")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("h4",{id:"scalegamma"},"scaleGamma"),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("p",null,"A ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("a",{parentName:"p",href:"https://airbnb.io/visx/docs/scale",target:"_blank",rel:"nofollow noopener noreferrer"},"@visx/scale"),"-like power scale that implements gamma correction. With ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"p"},"scaleGamma"),", the normalization happens ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("strong",{parentName:"p"},"before")," raising to the exponent, contrary to ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("a",{parentName:"p",href:"https://github.com/d3/d3-scale/blob/main/README.md#scalePow",target:"_blank",rel:"nofollow noopener noreferrer"},Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"a"},"scalePower"))," where it happens ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("strong",{parentName:"p"},"after"),".\nImplements ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"p"},"domain"),", ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"p"},"range"),", ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"p"},"rangeRound"),", ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"p"},"exponent"),", ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"p"},"interpolate"),", ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"p"},"clamp"),", ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"p"},"nice"),", ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"p"},"ticks"),", ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"p"},"tickFormat")," and ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"p"},"copy"),"."),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("pre",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("code",{parentName:"pre",className:"language-ts"},"const scale = scaleGamma({\n    domain: Domain = [0, 1]\n    range: Domain = [0, 1],\n    exponent: number = 1,\n    clamp: boolean = false,\n});\n")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("h3",{id:"hooks"},"Hooks"),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("ul",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("li",{parentName:"ul"},Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("strong",{parentName:"li"},Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"strong"},"useDomain(...args): Domain | undefined"))," - Memoised version of ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"li"},"getDomain"),"."),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("li",{parentName:"ul"},Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("strong",{parentName:"li"},Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"strong"},"useDomains(...args): (Domain | undefined)[]"))," - Memoised version of ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"li"},"getDomains"),"."),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("li",{parentName:"ul"},Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("strong",{parentName:"li"},Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"strong"},"useCombinedDomain(...args): Domain | undefined"))," - Memoised version of ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"li"},"getCombinedDomain"),"."),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("li",{parentName:"ul"},Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("strong",{parentName:"li"},Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"strong"},"useVisDomain(...args): Domain"))," - Memoised version of ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"li"},"getVisDomain"),"."),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("li",{parentName:"ul"},Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("strong",{parentName:"li"},Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"strong"},"useSafeDomain(...args): [Domain, DomainErrors]"))," - Memoised version of ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("inlineCode",{parentName:"li"},"getSafeDomain"),".")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("h3",{id:"context-hooks"},"Context hooks"),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("h4",{id:"useaxissystemcontext"},"useAxisSystemContext"),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("pre",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("code",{parentName:"pre",className:"language-ts"},"useAxisSystemContext(): AxisSystemParams\n\nconst {\n  abscissaConfig,\n  ordinateConfig,\n  abscissaScale,\n  ordinateScale,\n  visSize\n} = useAxisSystemContext();\n")),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("h3",{id:"mock-data"},"Mock data"),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("p",null,"The library exposes a utility function to retrieve a mock entity's metadata and a mock dataset's value as ndarray for testing purposes.\nYou can browse through the available mock data at ",Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("a",{parentName:"p",href:"https://h5web.panosc.eu/mock",target:"_blank",rel:"nofollow noopener noreferrer"},"https://h5web.panosc.eu/mock"),"."),Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("pre",null,Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)("code",{parentName:"pre",className:"language-ts"},"import { findMockEntity, getMockDataArray } from '@h5web/lib';\n\nconst entity = findMockEntity('/nD_datasets/twoD');\nconst dataArray = getMockDataArray('/nD_datasets/twoD');\n")))}MDXContent.isMDXComponent=!0;const __page=()=>{throw new Error("Docs-only story")};__page.parameters={docsOnly:!0};const componentMeta={title:"Utilities",includeStories:["__page"]},mdxStoryNameToKey={};componentMeta.parameters=componentMeta.parameters||{},componentMeta.parameters.docs={...componentMeta.parameters.docs||{},page:()=>Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)(_storybook_addon_docs__WEBPACK_IMPORTED_MODULE_2__.a,{mdxStoryNameToKey:mdxStoryNameToKey,mdxComponentAnnotations:componentMeta},Object(_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.b)(MDXContent,null))},__webpack_exports__.default=componentMeta}}]);