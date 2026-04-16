import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://pgyxvhiiivhesgdfpmcc.supabase.co',
  'sb_publishable_OZEH_8NnBDT_BiCV3kDsEQ_qhntpZ_X'
);

// Fetch one row to see the columns
const { data, error } = await supabase.from('resumes').select('*').limit(1);
console.log('Error:', error);
console.log('Sample row:', JSON.stringify(data, null, 2));

// Check column names
if (data && data.length > 0) {
  console.log('Columns:', Object.keys(data[0]));
} else {
  console.log('Table is empty or does not exist');
}
