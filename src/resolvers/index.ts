import { Resolvers } from "../generated/resolvers-types";
import { dateScalar } from "../date-scale";
import queries from "./queries";
import mutations from "./mutations";

const resolvers: Resolvers = {
  Date: dateScalar,
  ...queries,
  ...mutations,
};

export default resolvers;
