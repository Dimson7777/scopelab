
CREATE TABLE public.generations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  brief TEXT NOT NULL,
  result JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.generations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own generations"
  ON public.generations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own generations"
  ON public.generations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
