--
-- PostgreSQL database dump
--

-- Dumped from database version 11.8 (Ubuntu 11.8-1.pgdg19.10+1)
-- Dumped by pg_dump version 12.3 (Ubuntu 12.3-1.pgdg19.10+1)

-- Started on 2020-09-13 13:59:53 -04

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

--
-- TOC entry 199 (class 1259 OID 16841)
-- Name: Bills; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Bills" (
    id integer NOT NULL,
    description character varying(255) NOT NULL,
    "totalValue" double precision NOT NULL,
    type integer NOT NULL,
    status integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone,
    "closedAt" timestamp without time zone,
    "totalMissing" double precision NOT NULL
);


ALTER TABLE public."Bills" OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 16833)
-- Name: FinnancialAccounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."FinnancialAccounts" (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    balance double precision,
    lastbalanceupdate timestamp without time zone
);


ALTER TABLE public."FinnancialAccounts" OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 16831)
-- Name: FinnancialAccounts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."FinnancialAccounts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."FinnancialAccounts_id_seq" OWNER TO postgres;

--
-- TOC entry 2952 (class 0 OID 0)
-- Dependencies: 196
-- Name: FinnancialAccounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."FinnancialAccounts_id_seq" OWNED BY public."FinnancialAccounts".id;


--
-- TOC entry 198 (class 1259 OID 16839)
-- Name: Bills_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Bills_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Bills_id_seq" OWNER TO postgres;

--
-- TOC entry 2953 (class 0 OID 0)
-- Dependencies: 198
-- Name: Bills_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Bills_id_seq" OWNED BY public."Bills".id;


--
-- TOC entry 2820 (class 2604 OID 16855)
-- Name: Bills id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Bills" ALTER COLUMN id SET DEFAULT nextval('public."Bills_id_seq"'::regclass);


--
-- TOC entry 2819 (class 2604 OID 16854)
-- Name: FinnancialAccounts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FinnancialAccounts" ALTER COLUMN id SET DEFAULT nextval('public."FinnancialAccounts_id_seq"'::regclass);


--
-- TOC entry 2823 (class 2606 OID 16838)
-- Name: FinnancialAccounts FinnancialAccounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FinnancialAccounts"
    ADD CONSTRAINT "FinnancialAccounts_pkey" PRIMARY KEY (id);


--
-- TOC entry 2825 (class 2606 OID 16846)
-- Name: Bills Bills_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Bills"
    ADD CONSTRAINT "Bills_pkey" PRIMARY KEY (id);


-- Completed on 2020-09-13 13:59:53 -04

--
-- PostgreSQL database dump complete
--
