import 'dotenv/config';
import { expect } from 'chai';
import { formatResults } from './lib';
import { FileCheckResponse } from './types';
const chromeResult: FileCheckResponse = require('./mock/chrome-response.json');
const malwareResult: FileCheckResponse = require('./mock/malware-response.json');

describe("formatResults", function() {
  it("return clean for Chrome hash mock", async function() {
    expect(formatResults(chromeResult, false)).to.deep.equals({ 'type-unsupported': 13, undetected: 57 });
  });
  it("expect to properly format results with verbose flag off", async function() {
    expect(formatResults(chromeResult)).to.deep.equals({ 'type-unsupported': 13, undetected: 57 });
  });
  it("expect to properly format results with verbose flag on", async function() {
    expect(formatResults(chromeResult, true)).to.deep.equals({ 'type-unsupported': 13, undetected: 57 });
  });
  it("verbose results are same as non-verbose", async function() {
    expect(formatResults(chromeResult, true)).to.be.deep.equals(formatResults(chromeResult));
    expect(formatResults(malwareResult, true)).to.be.deep.equals(formatResults(malwareResult));
  });
  it("fail recognize malicious hash", async function () {
    expect(formatResults(malwareResult)).to.deep.equals({ 'type-unsupported': 16, malicious: 31, undetected: 28 });
  });
  it("fail recognize malicious hash verbosely", async function () {
    expect(formatResults(malwareResult, true)).to.deep.equals({ 'type-unsupported': 16, malicious: 31, undetected: 28 });
  });
});
