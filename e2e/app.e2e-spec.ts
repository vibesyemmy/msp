import { P2Page } from './app.po';

describe('p2 App', () => {
  let page: P2Page;

  beforeEach(() => {
    page = new P2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
