export interface Opportunity {
    total: number,
    has_more: Boolean,
    deals: Deal[]
}

export interface Deal {
    _id: string;
    id: string;
    name: string;
    amount_montly: number;
    amount_unique: number;
    amount_total: number;
    prediction_date: string | null;
    markup: string;
    last_activity_at: string | null;
    interactions: number;
    markup_last_activities: string | null;
    created_at: string;
    updated_at: string;
    rating: number;
    markup_created: string;
    last_activity_content: string | null;
    user_changed: boolean;
    hold: string | null;
    win: boolean | null;
    closed_at: string | null;
    stop_time_limit: {
        expiration_date_time: string;
        expired: boolean;
        expired_days: number;
    };
    user: {
        _id: string;
        id: string;
        name: string;
        nickname: string;
        email: string;
    };
    deal_stage: {
        _id: string;
        id: string;
        name: string;
        nickname: string;
        created_at: string;
        updated_at: string;
    };
    next_task: {
        _id: string;
        id: string;
        date: string;
        subject: string;
        type: string;
        hour: string;
    };
    contacts: {
        name: string;
        title: string;
        notes: string | null;
        facebook: string | null;
        linkedin: string | null;
        skype: string | null;
        birthday: string | null;
        emails: string[];
        phones: {
            phone: string;
            type: string;
        }[];
    }[];
    deal_custom_fields: {
        value: string | number | null;
        created_at: string | null;
        updated_at: string | null;
        custom_field_id: string;
        custom_field: {
            _id: string;
            id: string;
            for: string;
            label: string;
            order: number;
            allow_new: boolean;
            required: boolean;
            type: string;
            unique: boolean;
            visible: boolean;
            created_at: string;
            updated_at: string;
        };
    }[];
    deal_products: any[]; // Assuming it's an array of some specific type, you can update this as needed.
}


export interface OpportunityParams {
    page?: string;
    limit?: string;
    order?: string;
    direction?: string;
    name?: string;
    win?: string;
    user_id?: string;
    closed_at?: string;
    closed_at_period?: string;
    created_at_period?: string;
    prediction_date_period?: string;
    start_date?: string;
    end_date?: string;
    campaign_id?: string;
    deal_stage_id?: string;
    deal_lost_reason_id?: string;
    deal_pipeline_id?: string;
    organization?: string;
    hold?: string;
    product_presence?: string;
}
