export type RxQueryPlanKey = string | number | undefined;

export type RxQueryPlanerOpts = {
    startKey: RxQueryPlanKey;
    endKey: RxQueryPlanKey;
    /**
     * True if the first matching document
     * must also be included into the result set.
     */
    inclusiveStart: boolean;
    /**
     * True if the last matching document
     * must also be included into the result set.
     */
    inclusiveEnd: boolean;
}

export type RxQueryPlan = {
    index: string[];
    /**
     * If the index does not match the sort params,
     * we have to resort the query results.
     */
    sortFieldsSameAsIndexFields: boolean;

    /**
     * TODO add a flag that determines
     * if we have to run the selector matching on all results
     * or if the used index anyway matches ALL operators.
     */
    
    startKeys: RxQueryPlanKey[];
    endKeys: RxQueryPlanKey[];
    /**
     * True if the first matching document
     * must also be included into the result set.
     */
    inclusiveStart: boolean;
    /**
     * True if the last matching document
     * must also be included into the result set.
     */
    inclusiveEnd: boolean;

};
