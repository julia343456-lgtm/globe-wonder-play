create or replace function public.validate_contact_submission()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if length(new.name) > 200 then raise exception 'Name too long'; end if;
  if length(new.email) > 255 then raise exception 'Email too long'; end if;
  if new.email !~* '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$' then
    raise exception 'Invalid email format';
  end if;
  if coalesce(length(new.company), 0) > 200 then raise exception 'Company too long'; end if;
  if coalesce(length(new.website), 0) > 500 then raise exception 'Website too long'; end if;
  if coalesce(length(new.message), 0) > 5000 then raise exception 'Message too long'; end if;
  if array_length(new.services, 1) > 10 then raise exception 'Too many services'; end if;
  return new;
end;
$$;

create trigger validate_contact_submission_trigger
before insert on public.contact_submissions
for each row execute function public.validate_contact_submission();