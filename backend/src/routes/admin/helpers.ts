import { Response } from 'express';

/** Render a view to string so we can inject it into the layout's body. */
export function renderView(
  res: Response,
  view: string,
  data: Record<string, unknown> = {}
): Promise<string> {
  return new Promise((resolve, reject) => {
    res.app.render(view, data, (err: Error | null, html: string) => {
      if (err) reject(err);
      else resolve(html);
    });
  });
}
