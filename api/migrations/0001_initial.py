# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Tournament'
        db.create_table(u'api_tournament', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('tournament_name', self.gf('django.db.models.fields.CharField')(default='', max_length=50, blank=True)),
            ('num_entries', self.gf('django.db.models.fields.IntegerField')(default=0)),
            ('start_date', self.gf('django.db.models.fields.IntegerField')(default=0)),
            ('end_date', self.gf('django.db.models.fields.IntegerField')(default=0)),
            ('bid_round', self.gf('django.db.models.fields.IntegerField')(default=0)),
            ('prelims', self.gf('django.db.models.fields.IntegerField')(default=0)),
            ('breaks_to', self.gf('django.db.models.fields.IntegerField')(default=0)),
            ('curr_rounds', self.gf('django.db.models.fields.IntegerField')(default=0)),
            ('location', self.gf('django.db.models.fields.CharField')(default='', max_length=100, blank=True)),
        ))
        db.send_create_signal(u'api', ['Tournament'])

        # Adding model 'Team'
        db.create_table(u'api_team', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('team_name', self.gf('django.db.models.fields.CharField')(default='', max_length=100, blank=True)),
            ('team_code', self.gf('django.db.models.fields.CharField')(default='', max_length=50, blank=True)),
        ))
        db.send_create_signal(u'api', ['Team'])

        # Adding M2M table for field tournaments on 'Team'
        m2m_table_name = db.shorten_name(u'api_team_tournaments')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('team', models.ForeignKey(orm[u'api.team'], null=False)),
            ('tournament', models.ForeignKey(orm[u'api.tournament'], null=False))
        ))
        db.create_unique(m2m_table_name, ['team_id', 'tournament_id'])

        # Adding M2M table for field bids on 'Team'
        m2m_table_name = db.shorten_name(u'api_team_bids')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('team', models.ForeignKey(orm[u'api.team'], null=False)),
            ('tournament', models.ForeignKey(orm[u'api.tournament'], null=False))
        ))
        db.create_unique(m2m_table_name, ['team_id', 'tournament_id'])

        # Adding model 'Judge'
        db.create_table(u'api_judge', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(default='', max_length=50, blank=True)),
            ('paradigm', self.gf('django.db.models.fields.TextField')(default='', blank=True)),
            ('school', self.gf('django.db.models.fields.CharField')(default='', max_length=50, blank=True)),
        ))
        db.send_create_signal(u'api', ['Judge'])

        # Adding model 'Round'
        db.create_table(u'api_round', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('aff_team', self.gf('django.db.models.fields.related.ForeignKey')(related_name='aff_rounds', to=orm['api.Team'])),
            ('neg_team', self.gf('django.db.models.fields.related.ForeignKey')(related_name='neg_rounds', to=orm['api.Team'])),
            ('winner', self.gf('django.db.models.fields.related.ForeignKey')(blank=True, related_name='wins', null=True, to=orm['api.Team'])),
            ('loser', self.gf('django.db.models.fields.related.ForeignKey')(blank=True, related_name='losses', null=True, to=orm['api.Team'])),
            ('round_num', self.gf('django.db.models.fields.IntegerField')()),
        ))
        db.send_create_signal(u'api', ['Round'])

        # Adding M2M table for field tournament on 'Round'
        m2m_table_name = db.shorten_name(u'api_round_tournament')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('round', models.ForeignKey(orm[u'api.round'], null=False)),
            ('tournament', models.ForeignKey(orm[u'api.tournament'], null=False))
        ))
        db.create_unique(m2m_table_name, ['round_id', 'tournament_id'])

        # Adding M2M table for field judge on 'Round'
        m2m_table_name = db.shorten_name(u'api_round_judge')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('round', models.ForeignKey(orm[u'api.round'], null=False)),
            ('judge', models.ForeignKey(orm[u'api.judge'], null=False))
        ))
        db.create_unique(m2m_table_name, ['round_id', 'judge_id'])


    def backwards(self, orm):
        # Deleting model 'Tournament'
        db.delete_table(u'api_tournament')

        # Deleting model 'Team'
        db.delete_table(u'api_team')

        # Removing M2M table for field tournaments on 'Team'
        db.delete_table(db.shorten_name(u'api_team_tournaments'))

        # Removing M2M table for field bids on 'Team'
        db.delete_table(db.shorten_name(u'api_team_bids'))

        # Deleting model 'Judge'
        db.delete_table(u'api_judge')

        # Deleting model 'Round'
        db.delete_table(u'api_round')

        # Removing M2M table for field tournament on 'Round'
        db.delete_table(db.shorten_name(u'api_round_tournament'))

        # Removing M2M table for field judge on 'Round'
        db.delete_table(db.shorten_name(u'api_round_judge'))


    models = {
        u'api.judge': {
            'Meta': {'object_name': 'Judge'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '50', 'blank': 'True'}),
            'paradigm': ('django.db.models.fields.TextField', [], {'default': "''", 'blank': 'True'}),
            'school': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '50', 'blank': 'True'})
        },
        u'api.round': {
            'Meta': {'object_name': 'Round'},
            'aff_team': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'aff_rounds'", 'to': u"orm['api.Team']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'judge': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'rounds'", 'symmetrical': 'False', 'to': u"orm['api.Judge']"}),
            'loser': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "'losses'", 'null': 'True', 'to': u"orm['api.Team']"}),
            'neg_team': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'neg_rounds'", 'to': u"orm['api.Team']"}),
            'round_num': ('django.db.models.fields.IntegerField', [], {}),
            'tournament': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'rounds'", 'symmetrical': 'False', 'to': u"orm['api.Tournament']"}),
            'winner': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "'wins'", 'null': 'True', 'to': u"orm['api.Team']"})
        },
        u'api.team': {
            'Meta': {'ordering': "('team_code',)", 'object_name': 'Team'},
            'bids': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'bids'", 'symmetrical': 'False', 'to': u"orm['api.Tournament']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'team_code': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '50', 'blank': 'True'}),
            'team_name': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '100', 'blank': 'True'}),
            'tournaments': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'entries'", 'symmetrical': 'False', 'to': u"orm['api.Tournament']"})
        },
        u'api.tournament': {
            'Meta': {'object_name': 'Tournament'},
            'bid_round': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'breaks_to': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'curr_rounds': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'end_date': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'location': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '100', 'blank': 'True'}),
            'num_entries': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'prelims': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'start_date': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'tournament_name': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '50', 'blank': 'True'})
        }
    }

    complete_apps = ['api']