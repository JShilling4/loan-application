<template>
	<div class="wrapper">
		<table class="appTable">
			<!-- Columns -->
			<thead>
				<tr>
					<th
						v-for="column in columns"
						:key="column.label"
						:class="column.thClass"
					>
						{{ column.label }}
					</th>
				</tr>
			</thead>

			<!-- Rows -->
			<tbody>
				<tr v-for="(row, index) in rows" :key="index">
					<td
						v-for="column in columns"
						:key="column.label"
						:class="column.tdClass"
					>
						<span
							v-if="column.field == 'edit'"
							class="icon"
							@click="$emit('edit', row)"
						>
							<font-awesome-icon :icon="['fal', 'edit']" />
						</span>
						<span
							v-else-if="column.field == 'delete'"
							class="icon"
							@click="$emit('delete', row)"
						>
							<font-awesome-icon :icon="['fal', 'file-times']" />
						</span>
						<span v-else>{{ row[column.field] }}</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	name: "AppTable",
	props: {
		columns: {
			type: Array
		},
		rows: {
			type: Array
		}
	}
};
</script>

<style lang="scss" scoped>
.wrapper {
	border: 1px solid #fff;
	border-radius: var(--app-border-radius);
}
table {
	font-size: 16px;
	border-collapse: collapse;
	width: 100%;
	max-width: 100%;
	table-layout: auto;
	tbody tr {
		&:not(:last-child) {
			border-bottom: 1px solid #fff;
		}
	}
	& td {
		padding: 1rem 1.5rem 1rem 1.5rem;
		font-size: 14px;
		vertical-align: middle;
		// border-bottom: 1px solid #fff;
		color: #fff;
		&:not(:last-child) {
			border-right: 1px solid #fff;
		}
	}
	& th {
		padding: 0.75rem 1.5rem 0.75rem 1.5rem;
		color: #fff;
		width: auto;
		text-align: left;
		vertical-align: bottom;
		border-bottom: 1px solid #fff;
		&:not(:last-child) {
			border-right: 1px solid #fff;
		}
	}
	.center {
		text-align: center;
	}
	.icon {
		cursor: pointer;
		font-size: 22px;
		opacity: 0.7;
		transition: opacity 0.3s;
		&:hover {
			opacity: 1;
		}
	}
}
</style>
