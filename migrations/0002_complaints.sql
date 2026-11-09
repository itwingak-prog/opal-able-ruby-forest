create table if not exists desk_roles (
  user_id      text primary key,
  role         text not null,
  display_name text not null default '',
  phone        text not null default '',
  officer_id   text
);

create table if not exists complaints (
  id             text primary key,
  seq            integer not null,
  filer_user_id  text not null,
  title          text not null,
  title_ta       text not null,
  description    text not null,
  description_ta text not null,
  category_id    text not null,
  ward_id        text not null,
  department_id  text not null,
  officer_id     text,
  citizen_name   text not null,
  citizen_phone  text not null,
  status         text not null,
  priority       text not null,
  channel        text not null,
  lat            double precision not null,
  lng            double precision not null,
  photo          text,
  after_photo    text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  ac_id          text not null default 'tcr',
  timeline_json  text not null default '[]',
  messages_json  text not null default '[]'
);

create index if not exists complaints_filer_idx on complaints (filer_user_id);
create index if not exists complaints_updated_idx on complaints (updated_at desc);
