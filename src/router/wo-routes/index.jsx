// Routes Imports
import WORoutes from "./Pages";

const Routes = WORoutes.map((d) => ({ ...d, type: 3 }));

const WoRoutes = [...Routes];

export { WoRoutes };
