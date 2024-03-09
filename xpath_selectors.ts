export const loginPage = {
  emailField: '//input[@id="pyLoginEmail"]',
  passwordField: '//input[@id="pyLoginPassword"]',
  loginButton: '//button[@id="pyLoginFormSubmitButton"]',
  dashboardPage: '//div[@id="pyDashboardPage"]'
}

export const betaEditorPage = {
  newDocumentBtn: '//button[@data-testid="create-document-button"]',
  filterBar: '//div[@data-testid="status-filter-bar"]',
  draftFilterBtn: '//div[@data-testid="status-filter-bar"]//button[text()="Draft"]',
  draftDocumentTag: '//div[contains(@class, "document-status-chip draft")]',
  trashedDocumentsBtn: '//div[@data-node-key="trash"]',
  emptyTrashNowAction: '//button[@class="snackbar-btn" and text()="Empty Trash now"]',
}

export const documentsPage = {
  documentTitle: '//input[@class="document-title"]',
  filesDragAndDropContainer: '//div[@class="file-drop-background"]',
  contentNodeTab: '//div[@data-node-key="content_tab"]',
  signatureNodeTab: '//div[@data-node-key="signatures_tab"]',
  rightPaneSignatureBlock: '//div[@class="signature__container"]//button[contains(@class, "signature_button")]',
  editorPage: '//div[@class="editor__page"]',
  signatureBlock: '//button[contains(@class, "signature_button")]',
  imageBlockBtn: '//div[@data-testid="image-block-button"]',
  addImageBlockBtn: '//div[@class="upload-button-container"]',
  uploadImageBlockInput: '//div[contains(@class, "image__library__box")]//li[1]//input',
  uploadImageLibraryChild: '//div[contains(@class, "image__library__box")]//li',
}

export const dashboardPage = {
  newBetaEditorLink: '//a[contains(text(), "Try our new beta editor")]',
}

