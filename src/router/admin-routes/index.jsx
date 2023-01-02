// Routes Imports
import Pages from "./Pages";

const AdminPages = Pages.map((d) => ({ ...d, type: 1 }));

// Merge Routes
const Routes = [...AdminPages];

export { Routes };
